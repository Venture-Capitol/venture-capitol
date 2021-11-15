provider "google" {
  project     = var.project
  region      = var.region
  zone        = var.zone
  credentials = file(var.credentials_file)
}

# Create a Cloud Run Service for backend
resource "google_cloud_run_service" "backend" {
  name     = "vc-backend"
  location = "europe-west1"

  template {
    spec {
      containers {
        image = "us-docker.pkg.dev/cloudrun/container/hello"

        env {
          name  = "DB_URL"
          value = "postgresql://${var.db_user}:${var.db_password}@/backend?host=/cloudsql/${google_sql_database_instance.vc_db.connection_name}"
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

  autogenerate_revision_name = true
}

# Create IAM Policy to enable http connections to service without authentication
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

# Create the sql databse for Venture Capitol
resource "google_sql_database_instance" "vc_db" {
  name             = "vc-database"
  region           = var.region
  database_version = "POSTGRES_13"


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

  deletion_protection = false
}

# Create Database and Credentials for the Backend
resource "google_sql_user" "database_user" {
  name     = var.db_user
  instance = google_sql_database_instance.vc_db.name
  password = var.db_password
}

resource "google_sql_database" "backend_database" {
  name     = "backend"
  instance = google_sql_database_instance.vc_db.name
}


# resource "google_compute_instance" "vm_instance" {
#   name         = "terraform-instance"
#   machine_type = "f1-micro"

#   boot_disk {
#     initialize_params {
#       image = "debian-cloud/debian-9"
#     }
#   }

#   network_interface {
#     # A default network is created for all GCP projects
#     network = google_compute_network.vpc_network.self_link
#     access_config {
#     }
#   }
# }

# resource "google_compute_network" "vpc_network" {
#   name                    = "vc-network"
#   auto_create_subnetworks = "true" 
# }

# resource "google_project_service" "project" {
#   # project = "your-project-id"
#   service = "compute.googleapis.com"

#   timeouts {
#     create = "30m"
#     update = "40m"
#   }

#   disable_dependent_services = true
# }
