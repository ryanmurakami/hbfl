// Imports
const {
  CreateHostedZoneCommand
} = require('@aws-sdk/client-route-53')
const { sendRoute53Command: sendCommand } = require('./helpers')

// Declare local variables
const hzName = 'hbfl.online'

async function execute () {
  try {
    const response = await createHostedZone(hzName)
    console.log(response)
  } catch (err) {
    console.error('Error creating hosted zone:', err)
  }
}

function createHostedZone (hzName) {
  // TODO: Create hostedzone with route53
}

execute()
