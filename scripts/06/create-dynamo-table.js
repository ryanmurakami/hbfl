// Imports
const {
  CreateTableCommand
} = require('@aws-sdk/client-dynamodb')
const { sendDynamoDBCommand } = require('./helpers')

async function execute () {
  try {
    await createTable('hamsters')
    const data = await createTable('races')
    console.log(data)
  } catch (err) {
    console.error('Could not create tables:', err)
  }
}

async function createTable (tableName) {
  // TODO: Create dynamodb table
}

execute()