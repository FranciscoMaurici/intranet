variable "project_id" {
  type        = string
  description = "The ID of the project where this VPC will be created"
}

variable "region" {
  type        = string
  description = "Name of the subnet's region"
}

variable "vpc_name" {
  type        = string
  description = "The name of the network being created"
}

variable "subnet_name" {
  type        = string
  description = "Name of the subnet"
}

variable "cidr_range" {
  type        = string
  description = "CIDR ip range of the subnet"
}
