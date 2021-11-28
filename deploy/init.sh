#!/bin/bash
# Get the project id, for this to worky you have to log in with gcloud cli first
PROJECT_ID=$(gcloud config get-value project)
# Create a new storage bucket, enable versioning and restrict external access
gsutil mb -l eur4 gs://${PROJECT_ID}-tfstate
gsutil versioning set on gs://${PROJECT_ID}-tfstate
gsutil pap set enforced gs://${PROJECT_ID}-tfstate
# Versioning keeps old versions of a file around, to limit storage costs, files with more than 3 new versions get deleted automatically
# We create a temporary file containing this policy
echo '{"rule": [{"action": {"type": "Delete"}, "condition": {"isLive": false, "numNewerVersions": 3}}]}' > tfStateLifecycleRule.json
gsutil lifecycle set ./tfStateLifecycleRule.json gs://${PROJECT_ID}-tfstate
rm ./tfStateLifecycleRule.json
# Set terraform variable project id
echo "project = \"${PROJECT_ID}\"" > terraform.tfvars