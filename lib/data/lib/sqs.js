const AWS = require('aws-sdk')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

const sqs = new AWS.SQS()

async function push (queueName, msg) {
  // TODO: Create params const to get queue URL

  try {
    // TODO: Get sqs queue URL
    // Then send message to queue url
  } catch (err) {
    throw new Error(`Error pushing to SQS queue: ${err}`)
  }
}

module.exports = { push }
