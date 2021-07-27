// Imports
const AWS = require('aws-sdk')
const config = require('config')

const helpers = require('./helpers')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// Declare local variables
// TODO: Declare dynamoDB DocumentClient object

helpers.getHamsterData()
  .then(data => populateTable('hamsters', data))
  .then(helpers.getRaceData)
  .then(data => populateTable('races', data))
  .then(console.log)
  .catch(console.error)

async function populateTable (tableName, data) {
  // TODO: Create params const object

  try {
    // TODO: Call batch write function
  } catch (err) {
    throw new Error(`Error populating Table: ${err}`)
  }
}
