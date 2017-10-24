const AWS = require('aws-sdk')

AWS.config.update({ region: '/* TODO: Add your region */' })

const sqs = new AWS.SQS()

function push (queueName, msg) {
  // TODO: Create params const to get queue URL

  return new Promise((resolve, reject) => {
    // TODO: Get sqs queue URL
    // Then send message to queue url
  })
}

module.exports = { push }
