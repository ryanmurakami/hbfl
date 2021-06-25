// Imports
const AWS = require('aws-sdk')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// Declare local variables
// TODO: Create kinesis object
const streamName = 'hamster-race-results'

createKinesisStream(streamName)
  .then(console.log)
  .catch(console.error)

async function createKinesisStream (streamName) {
  // TODO: Create params const

  try {
    // TODO: Create kinesis stream
  } catch (err) {
    throw new Error(`Error creating Kinesis Stream: ${err}`)
  }
}
