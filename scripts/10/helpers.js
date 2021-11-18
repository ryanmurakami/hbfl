const { CloudWatchClient } = require('@aws-sdk/client-cloudwatch')
const { SNSClient } = require('@aws-sdk/client-sns')

async function sendSNSCommand (command) {
  const client = new SNSClient({ region: process.env.AWS_REGION })
  return client.send(command)
}

async function sendCloudWatchCommand (command) {
  const client = new CloudWatchClient({ region: process.env.AWS_REGION })
  return client.send(command)
}

module.exports = {
  sendCloudWatchCommand,
  sendSNSCommand
}
