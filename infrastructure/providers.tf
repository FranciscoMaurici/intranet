terraform {
  backend "gcs" {
    bucket = "intranet-state-prod"
    prefix = "terraform/state"
  }
}

provider "google" {
  project     = "intranet-359916"
  region      = "us-east1"
}

provider "kubernetes" {
  host                   = "https://${module.gke.kubernetes_cluster_endpoint}"
  token                  = module.gke.gcp_access_token
  cluster_ca_certificate = base64decode(module.gke.kubernetes_cluster_ca_certificate)
}

provider "helm" {
  kubernetes {
    host                   = "https://${module.gke.kubernetes_cluster_endpoint}"
    token                  = module.gke.gcp_access_token
    cluster_ca_certificate = base64decode(module.gke.kubernetes_cluster_ca_certificate)
  }
  version         = "~> 2.4.1"
}