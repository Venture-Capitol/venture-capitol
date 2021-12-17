resource "google_storage_bucket" "frontend_staging" {
  name          = "vc-frontend-staging"
  location      = var.region
  force_destroy = true
  # uniform_bucket_level_access = true


  website {
    main_page_suffix = "index.html"
    not_found_page   = "index.html"
  }
}

resource "google_storage_default_object_access_control" "public_access" {
  bucket = google_storage_bucket.frontend_staging.name
  role   = "READER"
  entity = "allUsers"
}
