# Create Database and Credentials for the dlr-backend
resource "google_sql_database" "dlr_backend_database" {
  name     = var.dlr_db_name
  instance = google_sql_database_instance.vc_db.name
}

resource "random_password" "dlr_database_password" {
  length  = 32
  special = false
}

resource "google_sql_user" "dlr_database_user" {
  name     = var.dlr_db_user
  instance = google_sql_database_instance.vc_db.name
  password = random_password.dlr_database_password.result
}

resource "google_secret_manager_secret" "dlr_db_connection_string" {
  secret_id = "dlr_db_connection_string"

  replication {
    automatic = true
  }

  depends_on = [google_project_service.secretmanager]
}

resource "google_secret_manager_secret_version" "dlr_db_connection_string_data" {
  secret      = google_secret_manager_secret.dlr_db_connection_string.name
  secret_data = "postgresql://${var.dlr_db_user}:${random_password.dlr_database_password.result}@localhost/${var.dlr_db_name}?host=/cloudsql/${google_sql_database_instance.vc_db.connection_name}"
}

# Give access rights of secret to backend service account
resource "google_secret_manager_secret_iam_binding" "dlr_db_connection_string_access" {
  secret_id = google_secret_manager_secret.dlr_db_connection_string.id
  role      = "roles/secretmanager.secretAccessor"
  members   = [local.dlr_backend_serviceaccount]
}

# Create a Cloud Run Service for dlr backend
resource "google_cloud_run_service" "dlr_backend" {
  name                       = "dlr-backend"
  location                   = "europe-west1"
  autogenerate_revision_name = true

  template {
    spec {
      service_account_name = google_service_account.dlr_backend_sa.email

      containers {
        image = var.dlr_image_name

        env {
          name = "DATABASE_URL"

          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.dlr_db_connection_string.secret_id
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
        "run.googleapis.com/client-name"        = "dlr-backend"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_secret_manager_secret_version.dlr_db_connection_string_data, google_project_service.run]
}

resource "google_cloud_run_service_iam_policy" "dlr_noauth" {
  location = google_cloud_run_service.dlr_backend.location
  project  = google_cloud_run_service.dlr_backend.project
  service  = google_cloud_run_service.dlr_backend.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
