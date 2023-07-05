data "google_client_config" "current" {}

resource "google_container_cluster" "distillery_intranet_cluster" {
  name     = var.cluster_name
  project  = var.project_id
  location = var.zone

  initial_node_count       = 3
  remove_default_node_pool = true

  network    = var.vpc_id
  subnetwork = var.subnetwork_name

  ip_allocation_policy {
    cluster_ipv4_cidr_block  = "/16"
    services_ipv4_cidr_block = "/22"
  }

  master_auth {
    client_certificate_config {
      issue_client_certificate = false
    }
  }
}

resource "google_container_node_pool" "distillery_intranet_node_pool" {
  name           = var.node_pool_name
  location       = var.zone
  cluster        = google_container_cluster.distillery_intranet_cluster.name
  node_locations = var.node_zones
  node_count     = var.node_count

  autoscaling {
    max_node_count = 3
    min_node_count = 1
  }

  node_config {
    oauth_scopes = [
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
      "https://www.googleapis.com/auth/service.management.readonly",
      "https://www.googleapis.com/auth/servicecontrol",
      "https://www.googleapis.com/auth/trace.append"
    ]

    labels = {
      env = var.project_id
    }

    machine_type = var.machine_type
    disk_size_gb = var.disk_size_gb
    disk_type    = var.disk_type

    metadata = {
      disable-legacy-endpoints = "true"
    }

    tags = ["k8s"]
  }

  depends_on = [
    google_container_cluster.distillery_intranet_cluster
  ]

}

resource "kubernetes_namespace" "kubernetes_namespaces" {
  count = length(var.namespace_list)
  metadata {
    name = var.namespace_list[count.index]
  }
}

resource "kubernetes_namespace" "cert_manager" {
  metadata {
    labels = {
      "certmanager.k8s.io/disable-validation" = "true"
    }

    name = "cert-manager"
  }
}

resource "kubernetes_service_account" "tiller" {
  metadata {
    name      = "tiller"
    namespace = "kube-system"
  }
  automount_service_account_token = true
}

resource "kubernetes_cluster_role_binding" "tiller_cluster_admin" {
  metadata {
    name = "tiller-cluster-role-binding"
  }
  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = "cluster-admin"
  }
  subject {
    kind      = "ServiceAccount"
    name      = kubernetes_service_account.tiller.metadata.0.name
    namespace = kubernetes_service_account.tiller.metadata.0.namespace
  }
}

resource "helm_release" "intranet_helm_release" {
  chart     = "../DevOps/chart_prod"
  name      = "prod"
  namespace = var.namespace
}


