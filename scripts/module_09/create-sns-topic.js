// Imports
const AWS = require('aws-sdk')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// Declare local variables
// TODO: Create sns object
const topicName = 'hamster-topic'

createTopic(topicName)
  .then(console.log)
  .catch(console.error)

async function createTopic (topicName) {
  // TODO: Create params const

  try {
    // TODO: Create topic
  } catch (err) {
    throw new Error(`Error creating SNS Topic: ${err}`)
  }
}
