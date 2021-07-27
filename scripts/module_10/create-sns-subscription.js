// Imports
const AWS = require('aws-sdk')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// Declare local variables
const sns = new AWS.SNS()
const type = 'sms'
const endpoint = '/* TODO: Add your mobile number with country code */'
const topicArn = '/* TODO: Add your sns topic arn */'

createSubscription(type, topicArn, endpoint)
  .then(console.log)
  .catch(console.error)

async function createSubscription (type, topicArn, endpoint) {
  // TODO: Create params const

  try {
    // TODO: Subscribe
  } catch (err) {
    throw new Error(`Error creating SNS Subscription: ${err}`)
  }
}
