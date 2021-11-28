variable "project" {
  default = "PROJECT_ID"
}
variable "credentials_file" {
  default = "./credentials.json"
}
variable "region" {
  default = "europe-west1"
}
variable "zone" {
  default = "europe-west1-b"
}

variable "db_name" {
  type = string
  default = "backend"
}

variable "db_user" {
  type = string
  default = "backend_user"
}

