provider "google" {
  project = var.project
  region  = var.region
  zone    = var.zone
}

terraform {
  backend "gcs" {
    bucket = "venture-capitol-tfstate"
    prefix = "terraform/state"
  }
}


# Enable required APIs

## Secret Manager
resource "google_project_service" "secretmanager" {
  service            = "secretmanager.googleapis.com"
  disable_on_destroy = false
}

## Cloud Run
resource "google_project_service" "run" {
  service            = "run.googleapis.com"
  disable_on_destroy = false
}

## IAM
resource "google_project_service" "iam" {
  service            = "iam.googleapis.com"
  disable_on_destroy = false
}

## Cloud SQL
resource "google_project_service" "sql" {
  service            = "sqladmin.googleapis.com"
  disable_on_destroy = false
}

# Create a service account for cloud run
resource "google_service_account" "backend_sa" {
  account_id = "backend-sa"
  depends_on = [google_project_service.iam]
}

locals {
  backend_serviceaccount = "serviceAccount:${google_service_account.backend_sa.email}"
}

# Grant the service account access to databases and cloud run
resource "google_project_iam_binding" "service_permissions" {
  project = var.project
  for_each = toset([
    "run.admin", "cloudsql.client"
  ])

  role    = "roles/${each.key}"
  members = [local.backend_serviceaccount]
}


# Create the sql database for Venture Capitol
resource "google_sql_database_instance" "vc_db" {
  name                = "vc-backend-database"
  region              = var.region
  database_version    = "POSTGRES_13"
  deletion_protection = false

  settings {
    tier              = "db-f1-micro"
    disk_size         = 10
    availability_type = "ZONAL"

    maintenance_window {
      day  = "1"
      hour = "4"
    }

    backup_configuration {
      enabled    = true
      start_time = "04:30"
    }
  }

  depends_on = [google_project_service.sql]
}

# Create Database Password Secret and store it in secret manager
resource "random_password" "database_password" {
  length  = 32
  special = false
}

resource "google_secret_manager_secret" "db_connection_string" {
  secret_id = "db_connection_string"

  replication {
    automatic = true
  }

  depends_on = [google_project_service.secretmanager]
}

resource "google_secret_manager_secret_version" "db_connection_string_data" {
  secret      = google_secret_manager_secret.db_connection_string.name
  secret_data = "postgresql://${var.db_user}:${random_password.database_password.result}@localhost/${var.db_name}?host=/cloudsql/${google_sql_database_instance.vc_db.connection_name}"
}

# Give access rights of secret to backend service account
resource "google_secret_manager_secret_iam_binding" "db_connection_string_access" {
  secret_id = google_secret_manager_secret.db_connection_string.id
  role      = "roles/secretmanager.secretAccessor"
  members   = [local.backend_serviceaccount]
}


# Create Database and Credentials for the Backend
resource "google_sql_database" "backend_database" {
  name     = var.db_name
  instance = google_sql_database_instance.vc_db.name
}

resource "google_sql_user" "database_user" {
  name     = var.db_user
  instance = google_sql_database_instance.vc_db.name
  password = random_password.database_password.result
}


# Create a Cloud Run Service for backend
resource "google_cloud_run_service" "backend" {
  name                       = "vc-backend"
  location                   = "europe-west1"
  autogenerate_revision_name = true

  template {
    spec {
      service_account_name = google_service_account.backend_sa.email

      containers {
        image = var.image_name

        env {
          name = "DATABASE_URL"

          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.db_connection_string.secret_id
              key  = "1"
            }
          }
        }
      }
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"      = "10"
        "run.googleapis.com/cloudsql-instances" = google_sql_database_instance.vc_db.connection_name
        "run.googleapis.com/client-name"        = "terraform"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_secret_manager_secret_version.db_connection_string_data, google_project_service.run]
}

# Create IAM Policy to enable http connections to backend service without authentication
data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.backend.location
  project  = google_cloud_run_service.backend.project
  service  = google_cloud_run_service.backend.name

  policy_data = data.google_iam_policy.noauth.policy_data
}


resource "google_cloud_run_domain_mapping" "root" {
  location = var.region
  name     = "api.venturecapitol.de"

  metadata {
    namespace = var.project
  }

  spec {
    route_name = google_cloud_run_service.backend.name
  }
}