// Imports
const {
  CreateDeploymentCommand
} = require('@aws-sdk/client-api-gateway')
const { sendAPIGatewayCommand: sendCommand } = require('./helpers')

// Declare local variables
const stage = 'prod'
const apiId = '/* TODO: Add api id */'

async function execute () {
  try {
    const response = await createDeployment(apiId, stage)
    console.log(response)
  } catch (err) {
    console.error('Error deploying api:', err)
  }
}

function createDeployment (apiId, stageName) {
  // TODO: Create deployment
}

execute()
