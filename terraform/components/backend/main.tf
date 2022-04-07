terraform {
  backend "s3" {
    region               = "ap-northeast-1"
    bucket               = "deploy-047980477351-ap-northeast-1-efg.river"
    workspace_key_prefix = "fx-report"
    key                 = "components/backend/terraform.tfstate"
  }
}

locals {
  tags = {
    "env" = terraform.workspace
    "repository" = var.repository_name
  }
}