resource "google_storage_bucket" "distillery_intranet_bucket" {
  name          = var.bucket_name
  location      = "US"
}