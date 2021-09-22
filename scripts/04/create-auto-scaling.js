// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: '/* TODO: add your region */' })

// Declare local variables
const autoScaling = new AWS.AutoScaling()
const asgName = 'hamsterASG'
const lcName = 'hamsterLC'
const policyName = 'hamsterPolicy'
const tgArn = '/* TODO: get target group ARN */'

createAutoScalingGroup(asgName, lcName)
.then(() => createASGPolicy(asgName, policyName))
.then((data) => console.log(data))

function createAutoScalingGroup (asgName, lcName) {
  // TODO: Create an auto scaling group
}

function createASGPolicy (asgName, policyName) {
  // TODO: Create an auto scaling group policy
}
