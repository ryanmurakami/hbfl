const AWS = require('aws-sdk')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

const client = new AWS.DynamoDB.DocumentClient()

function getAll (tableName) {
  // TODO: Declare params for scan

  try {
    // TODO: Scan table and return
  } catch(err) {
    console.error('Error scanning DynamoDB table: ', err)
  }
}

function get (tableName, id) {
  // TODO: Declare params for query

  try {
    // TODO: Query table and return
  } catch(err) {
    console.error('Error getting from DynamoDB table: ', err)
  }
}

async function put (tableName, item) {
  const params = {
    TableName: tableName,
    Item: item
  }

  try {
    const data = await client.put(params).promise()
    return data
  } catch(err) {
    console.error('Error putting to DynamoDB table: ', err)
  }
}

module.exports = {
  get,
  getAll,
  put
}
