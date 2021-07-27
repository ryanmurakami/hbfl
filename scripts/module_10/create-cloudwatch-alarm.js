// Imports
const AWS = require('aws-sdk')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// Declare local variables
const cw = new AWS.CloudWatch()
const alarmName = 'hamster-elb-alarm'
const topicArn = '/* TODO: Add your SNS topic ARN */'
const tg = '/* TODO: Add last part of Target Group ARN */'
const lb = '/* TODO: Add last part of Load Balancer ARN */'

createCloudWatchAlarm(alarmName, topicArn, tg, lb)
  .then(console.log)
  .catch(console.error)

async function createCloudWatchAlarm (alarmName, topicArn, tg, lb) {
  // TODO: Create params const object

  try {
    // TODO: Call putMetricAlarm
  } catch (err) {
    throw new Error(`Error creating CloudWatch Alarm: ${err}`)
  }
}
