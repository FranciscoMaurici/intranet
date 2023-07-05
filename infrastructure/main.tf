module vpc {
  source      = "./modules/vpc"
  project_id  = var.project_id
  region      = var.region
  vpc_name    = var.vpc_name
  subnet_name = var.subnet_name
  cidr_range  = var.cidr_range
}

module gke {
  source          = "./modules/gke"
  project_id      = var.project_id
  zone            = var.zone
  vpc_id          = module.vpc.network_id
  subnetwork_name = module.vpc.subnetwork_name
  cluster_name    = var.cluster_name
  node_pool_name  = var.node_pool_name
  node_count      = var.node_count
  node_zones      = var.node_zones
  machine_type    = var.machine_type
  disk_size_gb    = var.disk_size_gb
  disk_type       = var.disk_type
  namespace_list  = var.namespace_list
  namespace       = var.namespace
}

module "mysql" {
  source                      = "./modules/db"
  database_instance_name_prod = var.database_instance_name_prd
  database_name_prod          = var.database_name_prd
  database_version_prod       = var.database_version_prd
  db_disk_size                = var.db_disk_size
  db_disk_type                = var.db_disk_type
  db_machine_type             = var.db_machine_type
  db_user_passwd_prod         = var.db_user_passwd_prd
  db_user_prod                = var.db_user_prd
  project_id                  = var.project_id
  region                      = var.region
  root_password_prod          = var.root_password_prd
  vpc_id                      = module.vpc.network_id
  zone                        = var.zone
}

module storage {
  source      = "./modules/storage"
  bucket_name = var.bucket_name
}

