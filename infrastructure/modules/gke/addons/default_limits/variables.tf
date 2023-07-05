variable "namespace_list" {
  type    = list(string)
  default = []
}

variable "df_request_cpu" {
  type    = string
  default = ""
}

variable "df_request_mem" {
  type    = string
  default = ""
}

variable "df_limits_cpu" {
  type    = string
  default = ""
}

variable "df_limits_mem" {
  type    = string
  default = ""
}

variable "dependency" {
  default = []
}
