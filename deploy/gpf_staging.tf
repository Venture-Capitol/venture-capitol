# Create a staging database

resource "random_password" "staging_db_password" {
  length  = 32
  special = false
}

resource "google_secret_manager_secret" "staging_db_connection_string" {
  secret_id = "staging_db_connection_string"

  replication {
    automatic = true
  }

  depends_on = [google_project_service.secretmanager]
}

resource "google_secret_manager_secret_version" "staging_db_connection_string" {
  secret      = google_secret_manager_secret.staging_db_connection_string.name
  secret_data = "postgresql://${var.staging_db_name}:${random_password.staging_db_password.result}@localhost/${var.staging_db_name}?host=/cloudsql/${google_sql_database_instance.vc_db.connection_name}"
}

# Give access rights of secret to backend service account
resource "google_secret_manager_secret_iam_binding" "staging_db_connection_string" {
  secret_id = google_secret_manager_secret.staging_db_connection_string.id
  role      = "roles/secretmanager.secretAccessor"
  members   = [local.backend_serviceaccount]
}

# Create Database and Credentials for the staging Backend
resource "google_sql_database" "staging_backend_database" {
  name     = var.staging_db_name
  instance = google_sql_database_instance.vc_db.name
}

resource "google_sql_user" "staging_database_user" {
  name     = var.staging_db_user
  instance = google_sql_database_instance.vc_db.name
  password = random_password.staging_db_password.result
}

resource "google_cloud_run_service" "staging_backend" {
  name                       = "vc-backend-staging"
  location                   = "europe-west1"
  autogenerate_revision_name = true

  template {
    spec {
      service_account_name = google_service_account.backend_sa.email

      containers {
        image = var.staging_image_name

        env {
          name = "DATABASE_URL"

          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.staging_db_connection_string.secret_id
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

  depends_on = [google_secret_manager_secret_version.staging_db_connection_string, google_project_service.run]
}

resource "google_cloud_run_service_iam_policy" "gpf_staging_noauth" {
  location = google_cloud_run_service.staging_backend.location
  project  = google_cloud_run_service.staging_backend.project
  service  = google_cloud_run_service.staging_backend.name

  policy_data = data.google_iam_policy.noauth.policy_data
}