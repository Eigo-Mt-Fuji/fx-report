resource "aws_iam_role" "this" {
    provider = aws.efgriver_global_devops

    name = "${terraform.workspace}FxReportGithubWorkflow"
    # https://dev.classmethod.jp/articles/create-iam-id-provider-for-github-actions-with-management-console/
    assume_role_policy = templatefile("${path.module}/templates/github-workflow-assume-role-policy.json", {
        federated_provider_id = aws_iam_openid_connect_provider.this.id
        oidc_provider = "token.actions.githubusercontent.com"
        oidc_claim = "sub"
        allowed_repo_fx_report = var.repository_name_front
        allowed_repo_fx_report_api = var.repository_name_api
        allowed_refs_fx_report = "*"
        allowed_refs_fx_report_api = "*"
    })

    tags = local.tags
}

resource "aws_iam_role_policy_attachment" "this_attach" {
    provider = aws.efgriver_global_devops
    role       = aws_iam_role.this.name
    policy_arn = "arn:aws:iam::aws:policy/ReadOnlyAccess"
}

resource "aws_iam_openid_connect_provider" "this" {
    provider = aws.efgriver_global_devops
    
    url = "https://token.actions.githubusercontent.com"

    client_id_list = [
        "sts.amazonaws.com"
    ]

    thumbprint_list = [
        "6938fd4d98bab03faadb97b34396831e3780aea1"
    ]
}

resource "aws_iam_policy" "this_sts" {
  provider = aws.efgriver_global_devops
  
  name        = "${terraform.workspace}FxReportGithubWorkflowPolicy"
  description = "${terraform.workspace}FxReportGithubWorkflowPolicy"

  policy = templatefile("${path.module}/templates/github-workflow-iam-policy.json", {
      bucket_name = aws_s3_bucket.this.bucket
  })
}

resource "aws_iam_role_policy_attachment" "this_sts_attach" {
  provider = aws.efgriver_global_devops
  role       = aws_iam_role.this.name
  policy_arn = aws_iam_policy.this_sts.arn
}