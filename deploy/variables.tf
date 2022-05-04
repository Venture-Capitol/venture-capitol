variable "project" {
  type    = string
  default = "venture-capitol"
}


variable "region" {
  type    = string
  default = "europe-west1"
}

variable "zone" {
  type    = string
  default = "europe-west1-b"
}

# GPF Service Configuration

variable "db_name" {
  type    = string
  default = "backend"
}

variable "staging_db_name" {
  type    = string
  default = "staging_backend"
}


variable "db_user" {
  type    = string
  default = "backend_user"
}

variable "staging_db_user" {
  type    = string
  default = "staging_backend_user"
}


variable "image_name" {
  type    = string
  default = "us-docker.pkg.dev/cloudrun/container/hello"
}

variable "staging_image_name" {
  type    = string
  default = "us-docker.pkg.dev/cloudrun/container/hello"
}

variable "slack_webhook_url" {
  type    = string
  default = ""
}

# DLR Service Configuration

variable "dlr_db_name" {
  type    = string
  default = "dlr_backend"
}

variable "dlr_staging_db_name" {
  type    = string
  default = "dlr_staging_backend"
}

variable "dlr_db_user" {
  type    = string
  default = "dlr_backend_user"
}

variable "dlr_staging_db_user" {
  type    = string
  default = "dlr_staging_backend_user"
}

variable "dlr_image_name" {
  type    = string
  default = "us-docker.pkg.dev/cloudrun/container/hello"
}

variable "dlr_staging_image_name" {
  type    = string
  default = "us-docker.pkg.dev/cloudrun/container/hello"
}




