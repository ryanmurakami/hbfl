const AWS = require('aws-sdk')

const RACES_TABLE = 'races'

AWS.config.update({ region: process.env.AWS_REGION })

const client = new AWS.DynamoDB.DocumentClient()

exports.handler = async event => {
  try {
    for (const record of event.Records) {
      const payload = Buffer.from(record.kinesis.data, 'base64').toString('ascii')
      const result = JSON.parse(payload)
      await putResults(result)
    }
    return 'success'
  } catch (err) {
    console.error('Could not handle kinesis message:', err)
    throw err
  }
}

async function putResults (result) {
  const getParams = {
    TableName: RACES_TABLE,
    Key: {
      id: result.race.id
    }
  }

  const response = await client.get(getParams).promise()
  const newItem = {
    ...response.Item,
    results: result.results
  }

  const putParams = {
    TableName: RACES_TABLE,
    Item: newItem
  }

  return client.put(putParams).promise()
}
