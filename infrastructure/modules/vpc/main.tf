resource "google_compute_network" "distillery_intranet_vpc" {
  name                    = var.vpc_name
  project                 = var.project_id
  auto_create_subnetworks = false
}

resource "google_compute_firewall" "allow_ssh" {
  name    = "${var.vpc_name}-ssh-firewall"
  network = google_compute_network.distillery_intranet_vpc.name

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  direction     = "INGRESS"
  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["k8s"]
}

resource "google_compute_firewall" "allow_http" {
  name    = "${var.vpc_name}-http-firewall"
  network = google_compute_network.distillery_intranet_vpc.name

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }

  direction     = "INGRESS"
  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["k8s"]
}

resource "google_compute_firewall" "allow_https" {
  name    = "${var.vpc_name}-https-firewall"
  network = google_compute_network.distillery_intranet_vpc.name

  allow {
    protocol = "tcp"
    ports    = ["443"]
  }

  direction     = "INGRESS"
  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["k8s"]
}

resource "google_compute_subnetwork" "distillery_intranet_subnet" {
  ip_cidr_range = var.cidr_range
  name          = var.subnet_name
  network       = google_compute_network.distillery_intranet_vpc.id
  region        = var.region
}

