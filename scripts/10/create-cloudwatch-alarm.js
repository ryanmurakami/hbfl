// Imports
const {
  PutMetricAlarmCommand
} = require('@aws-sdk/client-cloudwatch')
const { sendCloudWatchCommand: sendCommand } = require('./helpers')

// Declare local variables
const alarmName = 'hamster-elb-alarm'
const topicArn = '/* TODO: Add your SNS topic ARN */'
const tg = '/* TODO: Add last part of Target Group ARN */'
const lb = '/* TODO: Add last part of Load Balancer ARN */'

async function execute () {
  try {
    const response = await createCloudWatchAlarm(alarmName, topicArn, tg, lb)
    console.log(response)
  } catch (err) {
    console.error('Error creating CloudWatch alarm:', err)
  }
}

function createCloudWatchAlarm (alarmName, topicArn, tg, lb) {
  // TODO: Create alarm with PutMetricAlarmCommand
}

execute()
