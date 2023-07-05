variable "project_id" {
  type        = string
  description = "The project ID to host the cluster in"
}

variable "zone" {
  type        = string
  description = "The zone name where GKE cluster is located"
}

variable "vpc_id" {
  type        = string
  description = "The ID of the VPC where cluster is located"
}

variable "subnetwork_name" {
  type        = string
  description = "The self link of the subnetwork where the gke cluster is located"
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

variable "namespace" {
  type        = string
  description = "Namespace to deploy charts."
}
