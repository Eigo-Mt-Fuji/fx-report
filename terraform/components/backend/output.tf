output "s3_bucket_name" {

    value = aws_s3_bucket.this.bucket
}

output "github_workflow_iam_role_arn" {

    value = aws_iam_role.this.arn
}