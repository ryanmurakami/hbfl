// Imports
const {
  CreateDBInstanceCommand
} = require('@aws-sdk/client-rds')
const {
  createSecurityGroup,
  sendRDSCommand
} = require('./helpers')

const dbName = 'user'

async function execute () {
  try {
    const groupName = `${dbName}-db-sg`
    const sgId = await createSecurityGroup(groupName, 3306)
    const response = await createDatabase(dbName, sgId)
    console.log(response)
  } catch (err) {
    console.error('Could not create database:', err)
  }
}

async function createDatabase (dbName, sgId) {
  // TODO: Create the db instance
}

execute()
