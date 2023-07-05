variable "project_id" {
  type        = string
  description = "The project ID to host the cluster in (required)"
}

variable "region" {
  type        = string
  description = "Name of the subnet's region"
}

variable "zone" {
  type        = string
  description = "The zone name where database is located"
}

variable "vpc_id" {
  type        = string
  description = "The ID of the VPC where cluster is located"
}

variable "database_name_prod" {
  type        = string
  description = "The name of the database"
}

variable "database_instance_name_prod" {
  type        = string
  description = "The name of the database instance"
}

variable "database_version_prod" {
  type        = string
  description = "The version of the database"
}

variable "root_password_prod" {
  type        = string
  description = "The root password of the database"
  sensitive   = true
}

variable "db_user_prod" {
  type        = string
  description = "The user of the database"
}

variable "db_user_passwd_prod" {
  type        = string
  description = "The user password of the database"
  sensitive   = true
}

variable "db_machine_type" {
  type        = string
  description = "The type of the database VM"
}

variable "db_disk_type" {
  type        = string
  description = "The type of the database disk"
}

variable "db_disk_size" {
  type        = string
  description = "The disk size GB of the database disk"
}
