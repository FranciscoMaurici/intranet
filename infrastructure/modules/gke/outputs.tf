output "gcp_access_token" {
  value = data.google_client_config.current.access_token
  description = "The Client access token for GCP"
}

output "kubernetes_cluster_id" {
  value = google_container_cluster.distillery_intranet_cluster.id
  description = "The GKE cluster ID"
}

output "kubernetes_cluster_endpoint" {
  value = google_container_cluster.distillery_intranet_cluster.endpoint
  description = "The GKE cluster endpoint"
}

output "kubernetes_cluster_ca_certificate" {
  value = google_container_cluster.distillery_intranet_cluster.master_auth[0].cluster_ca_certificate
  description = "The GKE cluster CA Certificate"
}

output "helm_service_account" {
  value = kubernetes_service_account.tiller.metadata.0.name
  description = "The helm service service account"
}
