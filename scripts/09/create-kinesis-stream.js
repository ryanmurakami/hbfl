// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: '/* TODO: Add your region */' })

// Declare local variables
// TODO: Create kinesis object
const streamName = 'hamster-race-results'

createKinesisStream(streamName)
.then(data => console.log(data))

function createKinesisStream (streamName) {
  // TODO: Create params const

  return new Promise((resolve, reject) => {
    // TODO: Create kinesis stream
  })
}
