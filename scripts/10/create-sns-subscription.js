// Imports
const {
  SubscribeCommand
} = require('@aws-sdk/client-sns')
const { sendSNSCommand: sendCommand } = require('./helpers')

// Declare local variables
const type = 'sms'
const endpoint = '/* TODO: Add your mobile number with country code */'
const topicArn = '/* TODO: Add your sns topic arn */'

async function execute () {
  try {
    const response = await createSubscription(type, topicArn, endpoint)
    console.log(response)
  } catch (err) {
    console.error('Error subscribing to topic:', err)
  }
}

function createSubscription (type, topicArn, endpoint) {
  // TODO: Subscribe to topic
}

execute()
