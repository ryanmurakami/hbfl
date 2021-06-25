const AWS = require('aws-sdk')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

const sns = new AWS.SNS()
const TOPIC_ARN = '/* TODO: Add your topic arn */'

async function publish (msg) {
  // TODO: Create params const object

  try {
    // TODO: Publish message
  } catch (err) {
    throw new Error(`Error publishing message to SNS topic: ${err}`)
  }
}

module.exports = { publish }
