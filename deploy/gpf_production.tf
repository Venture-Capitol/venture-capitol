# Create a random password for the gpf-backend database
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

# Create Database and Credentials for the gpf-backend
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
              key  = "latest"
            }
          }
        }

        env {
          name = "SLACK_WEBHOOK_URL"

          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.slack_webhook_url.secret_id
              key  = "latest"
            }
          }
        }
      }
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/minScale"      = "1"
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

resource "google_cloud_run_service_iam_policy" "gpf_noauth" {
  location = google_cloud_run_service.backend.location
  project  = google_cloud_run_service.backend.project
  service  = google_cloud_run_service.backend.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
