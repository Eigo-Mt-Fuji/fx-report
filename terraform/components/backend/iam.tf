resource "aws_iam_role" "this" {
    provider = aws.efgriver_global_devops

    name = "${terraform.workspace}FxReportGithubWorkflow"

    assume_role_policy = templatefile("${path.module}/templates/github-workflow-assume-role-policy.json", {
        federated_provider_id = aws_iam_openid_connect_provider.this.id
        repo_sub = "repo:${var.repository_name}:*"
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
    
    url = "https://vstoken.actions.githubusercontent.com"

    client_id_list = [
        "sigstore",
    ]

    thumbprint_list = [
        "a031c46782e6e6c662c2c87c76da9aa62ccabd8e"
    ]
}

resource "aws_iam_policy" "this_sts" {
  provider = aws.efgriver_global_devops
  
  name        = "${terraform.workspace}FxReportGithubWorkflowPolicy"
  description = "${terraform.workspace}FxReportGithubWorkflowPolicy"

  policy = file("${path.module}/templates/github-workflow-iam-policy.json")
}

resource "aws_iam_role_policy_attachment" "this_sts_attach" {
  provider = aws.efgriver_global_devops
  role       = aws_iam_role.this.name
  policy_arn = aws_iam_policy.this_sts.arn
}