const AWS = require('aws-sdk')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

const RACES_TABLE = 'races'

const client = new AWS.DynamoDB.DocumentClient()

exports.handler = async event => {
  try {
    for (const record of event.Records) {
      const payload = Buffer.from(record.kinesis.data, 'base64').toString('ascii')
      const result = JSON.parse(payload)
      await putResults(result)
    }
  } catch (err) {
    throw new Error(`Error processing records: ${err}`)
  }
}

async function putResults (result) {
  const getParams = {
    TableName: RACES_TABLE,
    Key: {
      id: result.race.id
    }
  }

  try {
    const data = await client.get(getParams).promise()
    data.Item.results = result.results

    const putParams = {
      TableName: RACES_TABLE,
      Item: data.Item
    }

    await client.put(putParams).promise()
  } catch (err) {
    throw new Error(`Error putting results in DynamoDB Table: ${err}`)
  }
}
