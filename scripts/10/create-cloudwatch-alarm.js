// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: '/* TODO: Add your region */' })

// Declare local variables
const cw = new AWS.CloudWatch()
const alarmName = 'hamster-elb-alarm'
const topicArn = '/* TODO: Add your SNS topic ARN */'
const tg = '/* TODO: Add last part of Target Group ARN */'
const lb = '/* TODO: Add last part of Load Balancer ARN */'

createCloudWatchAlarm(alarmName, topicArn, tg, lb)
.then(data => console.log(data))

function createCloudWatchAlarm (alarmName, topicArn, tg, lb) {
  // TODO: Create params const object

  return new Promise((resolve, reject) => {
    // TODO: Call putMetricAlarm
  })
}
