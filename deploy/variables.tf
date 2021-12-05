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

# Backend Service Configuration

variable "db_name" {
  type    = string
  default = "backend"
}

variable "db_user" {
  type    = string
  default = "backend_user"
}

variable "image_name" {
  type    = string
  default = "us-docker.pkg.dev/cloudrun/container/hello"
}
