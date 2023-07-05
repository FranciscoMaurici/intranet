resource "kubernetes_limit_range" "default_limits" {
  count = length(var.namespace_list)
  metadata {
    name      = "limits-${var.namespace_list[count.index]}"
    namespace = var.namespace_list[count.index]
  }

  spec {
    limit {
      type = "Container"
      default_request = {
        cpu    = var.df_request_cpu
        memory = var.df_request_mem
      }

      default = {
        cpu    = var.df_limits_cpu
        memory = var.df_limits_mem
      }
    }

  }
}
