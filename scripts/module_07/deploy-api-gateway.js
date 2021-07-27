// Imports
const AWS = require('aws-sdk')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// Declare local variables
const apiG = new AWS.APIGateway()
const apiId = '/* TODO: Add api id */'

createDeployment(apiId, 'prod')
  .then(console.log)
  .catch(console.error)

async function createDeployment (apiId, stageName) {
  // TODO: Create params const

  try {
    // TODO: Create deployment
  } catch (err) {
    throw new Error(`Error creating API Gateway Deployment: ${err}`)
  }
}
