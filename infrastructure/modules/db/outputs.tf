output "db_self_link_prod" {
  value = google_sql_database.distillery_intranet_database_prod.self_link
  description = "The database self link"
}

output "db_connection_name_prod" {
  value = google_sql_database_instance.distillery_intranet_db_instance_prod.connection_name
  description = "The database string connection"
}

output "db_public_ip_prod" {
  value = google_sql_database_instance.distillery_intranet_db_instance_prod.public_ip_address
  description = "The database string connection for DEV"
}
