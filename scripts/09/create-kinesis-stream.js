// Imports
const {
  CreateStreamCommand
} = require('@aws-sdk/client-kinesis')
const { sendKinesisCommand: sendCommand } = require('./helpers')

// Declare local variables
const streamName = 'hamster-race-results'

async function execute () {
  try {
    const response = await createKinesisStream(streamName)
    console.log(response)
  } catch (err) {
    console.error('Error creating Kinesis stream:', err)
  }
}

async function createKinesisStream (streamName) {
  // TODO: Create kinesis stream
}

execute()
