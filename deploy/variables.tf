variable "project" {
  
}
variable "credentials_file" {

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

