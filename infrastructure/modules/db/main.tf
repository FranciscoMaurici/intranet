resource "google_sql_database_instance" "distillery_intranet_db_instance_prod" {
  name              = var.database_instance_name_prod
  project           = var.project_id
  region            = var.region
  database_version  = var.database_version_prod
  root_password     = var.root_password_prod
  settings {
    tier              = var.db_machine_type
    disk_type         = var.db_disk_type
    disk_size         = var.db_disk_size
    availability_type = "ZONAL"

    location_preference {
      zone = var.zone
    }
  }
}

resource "google_sql_database" "distillery_intranet_database_prod" {
  instance = google_sql_database_instance.distillery_intranet_db_instance_prod.name
  name     = var.database_name_prod
}

resource "google_sql_user" "user_prod" {
  instance = google_sql_database_instance.distillery_intranet_db_instance_prod.name
  name     = var.db_user_prod
  password = var.db_user_passwd_prod
}