const AWS = require('aws-sdk')

AWS.config.update({ region: '/* TODO: Add your region */' })

const kinesis = new AWS.Kinesis()

function send (streamName, partition, msg) {
  // TODO: Create params const object

  kinesis.putRecord(params, (err, data) => {
    if (err) return console.error(err)
    else console.log(`Put Kinesis record with: ${JSON.stringify(data)}`)
  })
}

module.exports = { send }
