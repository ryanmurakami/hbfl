// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: '/* TODO: Add your region */' })

// Declare local variables
const sns = new AWS.SNS()
const type = 'sms'
const endpoint = '/* TODO: Add your mobile number with country code */'
const topicArn = '/* TODO: Add your sns topic arn */'

createSubscription(type, topicArn, endpoint)
.then(data => console.log(data))

function createSubscription (type, topicArn, endpoint) {
  // TODO: Create params const

  return new Promise((resolve, reject) => {
    // TODO: Subscribe
  })
}
