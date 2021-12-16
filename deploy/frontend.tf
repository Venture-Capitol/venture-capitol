resource "google_storage_bucket_iam" "allow" {
  bucket = google_storage_bucket.frontend_staging.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

resource "google_storage_bucket" "frontend_staging" {
  name = "vc-frontend-staging"
  location = var.region
  force_destroy = true
  uniform_bucket_level_access = true
  

  website {
    main_page_suffix = "index.html"
    not_found_page = "index.html"
  }
}

resource "google_storage_bucket_iam" "allow" {
  bucket = google_storage_bucket.frontend_staging.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}