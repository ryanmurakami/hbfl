const {
  SQSClient,
  GetQueueUrlCommand,
  SendMessageCommand
} = require('@aws-sdk/client-sqs')

const client = new SQSClient({ region: process.env.AWS_REGION })

async function push (queueName, msg) {
  // TODO: Get sqs queue URL
  // Then send message to queue url
}

module.exports = { push }
