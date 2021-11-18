const {
  DynamoDBClient
} = require('@aws-sdk/client-dynamodb')
const {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  ScanCommand
} = require('@aws-sdk/lib-dynamodb')

async function sendCommand (command) {
  const client = new DynamoDBClient({ region: process.env.AWS_REGION })
  const docClient = DynamoDBDocumentClient.from(client)
  return docClient.send(command)
}

async function getAll (tableName) {
  // TODO: Scan table and return Items
}

async function get (tableName, id) {
  // TODO: Query table and return first item
}

async function put (tableName, item) {
  const params = {
    TableName: tableName,
    Item: item
  }
  const command = new PutCommand(params)
  return sendCommand(command)
}

module.exports = {
  get,
  getAll,
  put
}
