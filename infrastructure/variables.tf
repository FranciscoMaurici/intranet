variable "project_id" {
  description = "The ID of the project where this VPC will be created"
}

variable "region" {
  type = string
  description = "Name of the subnet's region"
}

variable "zone" {
  type        = string
  description = "The zone name where GKE cluster is located"
}

variable "vpc_name" {
  description = "The name of the network being created"
}

variable "subnet_name" {
  type = string
  description = "Name of the subnet"
}

variable "cidr_range" {
  type = string
  description = "CIDR ip range of the subnet"
}

variable "cluster_name" {
  type        = string
  description = "The name of the cluster"
}

variable "node_pool_name" {
  type        = string
  description = "The node pool name"
  default     = null
}

variable "node_count" {
  type        = string
  description = "The quantity of nodes for cluster"
  default     = 1
}

variable "node_zones" {
  type        = list(string)
  description = "The zones to host the cluster in"
  default     = []
}

variable "machine_type" {
  type        = string
  description = "The machine type of the GKE node"
  default     = null
}

variable "disk_size_gb" {
  type        = string
  description = "The disk size for each node in GKE cluster"
  default     = 0
}

variable "disk_type" {
  type        = string
  description = "The disk type for each node in GKE cluster"
  default     = 0
}

variable "namespace_list" {
  type    = list(string)
  default = []
}

#Database variables
variable "database_name_prd" {
  type        = string
  description = "The name of the database"
}

variable "database_instance_name_prd" {
  type        = string
  description = "The name of the database instance"
}

variable "database_version_prd" {
  type        = string
  description = "The version of the database"
}

variable "root_password_prd" {
  type        = string
  description = "The root password of the database"
}

variable "db_user_prd" {
  type        = string
  description = "The user of the database"
}

variable "db_user_passwd_prd" {
  type        = string
  description = "The user password of the database"
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

#storage variables
variable "bucket_name" {
  type        = string
  description = "The name of the bucket"
}

variable "namespace" {
  type        = string
  description = "Namespace to deploy charts."
}
