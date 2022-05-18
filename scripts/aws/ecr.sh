#!/usr/bin/env bash
echo "Start logging in to ECS"

mkdir ~/.aws;

curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py";

python get-pip.py;
pip install awscli --ignore-installed six -q;

echo "[default]\naws_access_key_id=$AWS_ECR_ACCESS_KEY\naws_secret_access_key=$AWS_ECR_SECRET_KEY" > ~/.aws/credentials;
echo "[default]\nregion=$AWS_ECR_REGION" > ~/.aws/config;

login_string=`/usr/local/bin/aws ecr get-login --region $AWS_ECR_REGION`;

eval $login_string;
