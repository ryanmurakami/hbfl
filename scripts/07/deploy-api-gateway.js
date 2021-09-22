// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: '/* TODO: Add your region */' })

// Declare local variables
const apiG = new AWS.APIGateway()
const apiId = '/* TODO: Add api id */'

createDeployment(apiId, 'prod')
.then(data => console.log(data))

function createDeployment (apiId, stageName) {
  // TODO: Create params const

  return new Promise((resolve, reject) => {
    // TODO: Create deployment
  })
}
