const AWS = require('aws-sdk')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

const kinesis = new AWS.Kinesis()

async function send (streamName, partition, msg) {
  // TODO: Create params const object

  try {
    const data = await kinesis.putRecord(params).promise()
    console.log(`Put Kinesis record with: ${JSON.stringify(data)}`)
  } catch (err) {
    console.error(err)
  }
}

module.exports = { send }
