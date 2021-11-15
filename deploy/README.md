1. Run `terraform init` to install dependencies
2. Get Credentials as JSON from a service account with neccessary access rights from [IAM & Admin / Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts) and save as `gcp-credentials.json`
3. Run `GOOGLE_APPLICATION_CREDENTIALS=./gcp-credentials.json terraform apply` to apply terraform state
4. Use `terraform destroy` to remove all created infrastructure
