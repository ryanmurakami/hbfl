const AWS = require('aws-sdk')
const config = require('config')

const helpers = require('./helpers')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// Declare local variables
// TODO: Create an autoscaling object

const lcName = 'hamsterLC'
const roleName = 'hamsterLCRole'
const sgName = 'hamster_sg'
const keyName = 'hamster_key'

helpers.createIamRole(roleName)
  .then(profileArn => createLaunchConfiguration(lcName, profileArn))
  .then(console.log)
  .catch(console.error)

async function createLaunchConfiguration (lcName, profileArn) {
  // TODO: Create a launch configuration
}
