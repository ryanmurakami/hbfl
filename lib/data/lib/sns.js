const {
  SNSClient,
  PublishCommand
} = require('@aws-sdk/client-sns')

const client = new SNSClient({ region: process.env.AWS_REGION })
const topicArn = '/* TODO: Add your topic arn */'

function publish (msg) {
  // TODO: Publish message to SNS topic
}

module.exports = { publish }
