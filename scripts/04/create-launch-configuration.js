const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({ region: '/* TODO: add your region */' })

// Declare local variables
// TODO: Create an autoscaling object

const lcName = 'hamsterLC'
const roleName = 'hamsterLCRole'
const sgName = 'hamster_sg'
const keyName = 'hamster_key'

helpers.createIamRole(roleName)
.then(profileArn => createLaunchConfiguration(lcName, profileArn))
.then(data => console.log(data))

function createLaunchConfiguration (lcName, profileArn) {
  // TODO: Create a launch configuration
}
