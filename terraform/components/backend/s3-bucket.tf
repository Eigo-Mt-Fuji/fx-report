resource "aws_s3_bucket" "this" {
    provider = aws.efgriver_tokyo_devops

    bucket = "fx-report-data.${terraform.workspace}.efgriver.com"
    tags = local.tags
}

resource "aws_s3_bucket_acl" "this" {
    provider = aws.efgriver_tokyo_devops

    bucket = aws_s3_bucket.this.id
    acl    = "private"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "this" {
    provider = aws.efgriver_tokyo_devops

    bucket = aws_s3_bucket.this.id

    rule {
        apply_server_side_encryption_by_default {
            sse_algorithm     = "AES256"
        }
    }
}
