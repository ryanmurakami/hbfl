const { SQSClient } = require('@aws-sdk/client-sqs')

const client = new SQSClient({ region: process.env.AWS_REGION })

function push (queueName, msg) {
  // TODO: Create params const to get queue URL

  return new Promise((resolve, reject) => {
    // TODO: Get sqs queue URL
    // Then send message to queue url
  })
}

module.exports = { push }
