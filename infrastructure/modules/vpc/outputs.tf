output "network_name" {
  value       = google_compute_network.distillery_intranet_vpc.name
  description = "The name of the vpc being created"
}

output "network_id" {
  value       = google_compute_network.distillery_intranet_vpc.id
  description = "The id of the vpc being created"
}

output "network_self_link" {
  value       = google_compute_network.distillery_intranet_vpc.self_link
  description = "The uri of the vpc being created"
}

output "subnetwork_name" {
  value       = google_compute_subnetwork.distillery_intranet_subnet.name
  description = "The uri of the subnet being created"
}
