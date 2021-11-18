const { CloudFrontClient } = require('@aws-sdk/client-cloudfront')
const { S3Client } = require('@aws-sdk/client-s3')

async function sendCloudFrontCommand (command) {
  const client = new CloudFrontClient({ region: process.env.AWS_REGION })
  return client.send(command)
}

async function sendS3Command (command) {
  const client = new S3Client({ region: process.env.AWS_REGION })
  return client.send(command)
}

module.exports = {
  sendCloudFrontCommand,
  sendS3Command
}
