// Imports
const AWS = require('aws-sdk')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// Declare local variables
// TODO: Create sqs object
const queueName = 'hamster-race-results'

createQueue(queueName)
  .then(console.log)
  .catch(console.error)

async function createQueue (queueName) {
  // TODO: Create params const for creating queue

  try {
    return sqs.createQueue(params).promise()
  } catch (err) {
    throw new Error(`Error creating SQS Queue: ${err}`)
  }
}
