const AWS = require('aws-sdk')

AWS.config.update({ region: '/*TODO: Add your region */' })

const client = new AWS.DynamoDB.DocumentClient()

function getAll (tableName) {
  // TODO: Declare params for scan

  return new Promise((resolve, reject) => {
    // TODO: Scan table and return
  })
}

function get (tableName, id) {
  // TODO: Declare params for query

  return new Promise((resolve, reject) => {
    // TODO: Query table and return
  })
}

function put (tableName, item) {
  const params = {
    TableName: tableName,
    Item: item
  }
  return new Promise((resolve, reject) => {
    client.put(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

module.exports = {
  get,
  getAll,
  put
}
