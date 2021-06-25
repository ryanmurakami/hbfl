// Imports
const AWS = require('aws-sdk')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// Declare local variables
const autoScaling = new AWS.AutoScaling()
const asgName = 'hamsterASG'
const lcName = 'hamsterLC'
const policyName = 'hamsterPolicy'
const tgArn = '/* TODO: get target group ARN */'

createAutoScalingGroup(asgName, lcName)
  .then(() => createASGPolicy(asgName, policyName))
  .then(console.log)
  .catch(console.error)

async function createAutoScalingGroup (asgName, lcName) {
  // TODO: Create an auto scaling group
}

async function createASGPolicy (asgName, policyName) {
  // TODO: Create an auto scaling group policy
}
