// Imports
const AWS = require('aws-sdk')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// Declare local variables
// TODO: Declare dynamoDB object

createTable('hamsters')
  .then(() => createTable('races'))
  .then(console.log)
  .catch(console.error)

async function createTable (tableName) {
  // TODO: Declare params for createTable

  try {
    // TODO: Call createTable function
  } catch (err) {
    throw new Error(`Error creating DynamoDB Table: ${err}`)
  }
}
