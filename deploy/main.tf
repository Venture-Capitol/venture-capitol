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


#---------------------------------------------------------#
# ------------------------ API's -------------------------#
#---------------------------------------------------------#

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

## Maps Javascript
resource "google_project_service" "maps" {
  service            = "maps-backend.googleapis.com"
  disable_on_destroy = false
}

## Places
resource "google_project_service" "places" {
  service            = "places-backend.googleapis.com"
  disable_on_destroy = false
}



#---------------------------------------------------------#
# ------------------- Service Accounts -------------------#
#---------------------------------------------------------#

# Create a service account for the gpf-backend
resource "google_service_account" "backend_sa" {
  account_id = "backend-sa"
  depends_on = [google_project_service.iam]
}


# Create a service account for the dlr-backend
resource "google_service_account" "dlr_backend_sa" {
  account_id = "dlr-backend-sa"
  depends_on = [google_project_service.iam]
}

locals {
  backend_serviceaccount     = "serviceAccount:${google_service_account.backend_sa.email}"
  dlr_backend_serviceaccount = "serviceAccount:${google_service_account.dlr_backend_sa.email}"
}


# Grant the service accounts access to databases and cloud run
resource "google_project_iam_binding" "service_permissions" {
  project = var.project
  for_each = toset([
    "run.admin", "cloudsql.client"
  ])

  role    = "roles/${each.key}"
  members = [local.backend_serviceaccount, local.dlr_backend_serviceaccount, local.dlr_staging_backend_serviceaccount]
}

#---------------------------------------------------------#
# ----------------------- DATABASE -----------------------#
#---------------------------------------------------------#


# Create the main Postgres Instance
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




#---------------------------------------------------------#
# ----------------------- CLOUD RUN ----------------------#
#---------------------------------------------------------#


# Create IAM Policy to enable http connections to backend service without authentication
data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}
