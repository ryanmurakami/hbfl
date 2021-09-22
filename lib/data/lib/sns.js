const { SNSClient } = require('@aws-sdk/client-sns')

const client = new SNSClient({ region: process.env.AWS_REGION })
const TOPIC_ARN = '/* TODO: Add your topic arn */'

function publish (msg) {
  // TODO: Create params const object

  return new Promise((resolve, reject) => {
    // TODO: Publish message
  })
}

module.exports = { publish }
