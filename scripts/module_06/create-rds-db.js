// Imports
const AWS = require('aws-sdk')
const config = require('config')

const helpers = require('./helpers')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// TODO: Create an rds object
const dbName = 'user'

helpers.createSecurityGroup(dbName, 3306)
  .then(sgId => createDatabase(dbName, sgId))
  .then(console.log)
  .catch(console.error)

async function createDatabase (dbName, sgId) {
  // TODO: Create the params object

  try {
    // TODO: Create the db instance
  } catch (err) {
    throw new Error(`Error creating RDS Database Instance: ${err}`)
  }
}
