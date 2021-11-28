#!/bin/bash
PROJECT_ID=$(gcloud config get-value project)
gsutil mb -l eur4 gs://${PROJECT_ID}-tfstate
gsutil versioning set on gs://${PROJECT_ID}-tfstate
gsutil pap set enforced gs://${PROJECT_ID}-tfstate
echo '{"rule": [{"action": {"type": "Delete"}, "condition": {"isLive": false, "numNewerVersions": 3}}]}' > tfStateLifecycleRule.json
gsutil lifecycle set ./tfStateLifecycleRule.json gs://${PROJECT_ID}-tfstate
rm ./tfStateLifecycleRule.json
sed -i "s/PROJECT_ID/${PROJECT_ID}/g" ./variables.tf