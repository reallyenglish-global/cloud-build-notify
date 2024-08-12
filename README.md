# setup

## subscribe to topic
```bash
# list topics
gcloud pubsub topics list
```

## create the cloud function

## set runtime variables
1. EMAIL_TO: to address
2. EMAIL_FROM: from address
3. SENDGRID_API_KEY: API key for sendgrid

```bash
# set env vars
gcloud functions deploy FUNCTION_NAME --update-env-vars FOO=bar,BAZ=boo

# deploy
gcloud functions deploy envVar \
--runtime nodejs20 \
--set-env-vars FOO=bar \
--trigger-http
```


## Test

```bash
curl -m 70 -X POST https://region-your-project.cloudfunctions.net/send-build-notification \
-H "Authorization: bearer $(gcloud auth print-identity-token)" \
-H "Content-Type: application/json" \
-H "ce-id: 1234567890" \
-H "ce-specversion: 1.0" \
-H "ce-type: google.cloud.pubsub.topic.v1.messagePublished" \
-H "ce-time: 2020-08-08T00:11:44.895529672Z" \
-H "ce-source: //pubsub.googleapis.com/projects/your-project/topics/cloud-builds" \
-d '{
  "message": {
    "_comment": "data is base64 encoded string of '\''Hello World'\''",
    "data": "SGVsbG8gV29ybGQ="
  }
}'
```
or
`gcloud pubsub topics publish cloud-builds --message 'pub sub message' --project your-project`


# command line

```bash
# list functions
gcloud functions list
```

References
---
https://cloud.google.com/functions/docs/configuring/env-var?hl=en#gcloud
