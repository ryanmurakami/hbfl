const {
  KinesisClient,
  PutRecordCommand
} = require('@aws-sdk/client-kinesis')

const client = new KinesisClient({ region: process.env.AWS_REGION })

async function send (streamName, partition, msg) {
  // TODO: Create params const object

  try {
    const command = new PutRecordCommand(params)
    const data = await client.send(command)
    console.log(`Put Kinesis record with: ${JSON.stringify(data)}`)
  } catch (err) {
    console.error('Error putting record to Kinesis', err)
  }
}

module.exports = { send }
