# Create a staging service account for the dlr-backend 
resource "google_service_account" "dlr_staging_backend_sa" {
  account_id = "dlr-backend-staging-sa"
  depends_on = [google_project_service.iam]
}

locals {
  dlr_staging_backend_serviceaccount = "serviceAccount:${google_service_account.dlr_staging_backend_sa.email}"
}

# Create a staging database

resource "random_password" "dlr_staging_db_password" {
  length  = 32
  special = false
}

resource "google_secret_manager_secret" "dlr_staging_db_connection_string" {
  secret_id = "dlr_staging_db_connection_string"

  replication {
    automatic = true
  }

  depends_on = [google_project_service.secretmanager]
}

resource "google_secret_manager_secret_version" "dlr_staging_db_connection_string" {
  secret      = google_secret_manager_secret.dlr_staging_db_connection_string.name
  secret_data = "postgresql://${var.dlr_staging_db_name}:${random_password.dlr_staging_db_password.result}@localhost/${var.dlr_staging_db_name}?host=/cloudsql/${google_sql_database_instance.vc_db.connection_name}"
}

# Give access rights of secret to backend service account
resource "google_secret_manager_secret_iam_binding" "dlr_staging_db_connection_string" {
  secret_id = google_secret_manager_secret.dlr_staging_db_connection_string.id
  role      = "roles/secretmanager.secretAccessor"
  members   = [local.dlr_staging_backend_serviceaccount]
}

# Create Database and Credentials for the staging Backend
resource "google_sql_database" "dlr_staging_backend_database" {
  name     = var.dlr_staging_db_name
  instance = google_sql_database_instance.vc_db.name
}

resource "google_sql_user" "dlr_staging_database_user" {
  name     = var.dlr_staging_db_user
  instance = google_sql_database_instance.vc_db.name
  password = random_password.dlr_staging_db_password.result
}

# Create a Cloud Run Service for dlr backend

resource "google_cloud_run_service" "dlr_staging_backend" {
  name                       = "dlr-backend-staging"
  location                   = "europe-west1"
  autogenerate_revision_name = true

  template {
    spec {
      service_account_name = google_service_account.dlr_staging_backend_sa.email

      containers {
        image = var.dlr_staging_image_name

        env {
          name = "DATABASE_URL"

          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.dlr_staging_db_connection_string.secret_id
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

  depends_on = [google_secret_manager_secret_version.dlr_staging_db_connection_string, google_project_service.run]
}

resource "google_cloud_run_service_iam_policy" "dlr_staging_noauth" {
  location = google_cloud_run_service.dlr_staging_backend.location
  project  = google_cloud_run_service.dlr_staging_backend.project
  service  = google_cloud_run_service.dlr_staging_backend.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
