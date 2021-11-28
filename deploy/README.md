# Initial setup

There are some steps you have to perform in order to get the CI/CD pipeline up and running, which can't be performed automatically.
The following assumes that you already have a Project in Google Cloud with billing enabled.

1. Install the [GCloud SDK](https://cloud.google.com/sdk/docs/install)
2. Run `gcloud init`, log in with your account and select the project you want to use
3. Terraform needs to store the current terraform state somewhere to keep track of the resources it created. If you want to use it with CI/CD or multiple team members, you need to share the state somehow. We will create a new storage bucket for this.
4. Run `chmod +x init.sh && ./init.sh`. This will create a new bucket and set the appropriate permissions and lifecycle rules

# Run Terraform

1. Create a new service account for accessing google cloud using terraform from [IAM & Admin / Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts). For now we you should assign it the "editor" role, although we should probably restrict access event further. tbd.
2. Click the account, go to the "KEYS"-Tab, click "ADD KEY" -> "CREATE NEW KEY" and create a new JSON key. Download it into this folder and name it `credentials.json`

---

3. Run `terraform init` to install dependencies
4. Run `GOOGLE_APPLICATION_CREDENTIALS=./gcp-credentials.json terraform apply` to apply terraform state
5. Use `terraform destroy` to remove all created infrastructure

# TODO

- Command for creating the tf state bucket
- command for creating a ci/cd service account
- Github action steps:
  - run unit tests
  - build docker image
  - push docker image to artifact registry
  - run terraform apply

On pr feature -> dev

- run unit tests
- terraform plan

on commit dev

- build docker
- terraform apply

on pr dev -> main

- unit test
- terraform plan

on commit prod

- build docker
- terraform apply
