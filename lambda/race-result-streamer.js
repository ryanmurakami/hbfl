const AWS = require('aws-sdk')

const RACES_TABLE = 'races'

AWS.config.update({ region: 'us-east-1' })

const client = new AWS.DynamoDB.DocumentClient()

exports.handler = (event, context, callback) => {
  const promises = event.Records.map((record) => {
    const payload = Buffer.from(record.kinesis.data, 'base64').toString('ascii')
    const result = JSON.parse(payload)
    return putResults(result)
  })

  Promise.all(promises)
    .then(() => callback(null))
    .catch(err => callback(err))
}

function putResults (result) {
  return new Promise((resolve, reject) => {
    const getParams = {
      TableName: RACES_TABLE,
      Key: {
        id: result.race.id
      }
    }
    client.get(getParams, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        data.Item.results = result.results

        const putParams = {
          TableName: RACES_TABLE,
          Item: data.Item
        }

        client.put(putParams, (err, data) => {
          if (err) reject(err)
          else resolve(data)
        })
      }
    })
  })
}
