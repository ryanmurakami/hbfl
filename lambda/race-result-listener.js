const AWS = require('aws-sdk')

const RACE_QUEUE = 'race-result-queue'
const HAMSTERS_TABLE = 'hamsters'

AWS.config.update({ region: 'us-east-1' })

const sqs = new AWS.SQS()
const client = new AWS.DynamoDB.DocumentClient()

exports.handler = (event, context, callback) => {
  getMessage()
    .then((data) => {
      console.log(data)
      callback(null, data)
    })
    .catch((err) => {
      console.error(err)
      callback(err)
    })
}

function getMessage () {
  return new Promise((resolve, reject) => {
    sqs.getQueueUrl({ QueueName: RACE_QUEUE }, (err, queueData) => {
      if (err) {
        reject(err)
      } else {
        const QueueUrl = queueData.QueueUrl

        sqs.receiveMessage({
          QueueUrl,
          MaxNumberOfMessages: 10,
          VisibilityTimeout: 15
        }, (err, msgData) => {
          if (err) {
            reject(err)
          } else if (!msgData.Messages || !msgData.Messages.length) {
            resolve('No messages in data')
          } else {
            const resultsMap = groupMessagesByHamster(msgData.Messages)
            const promises = []

            for (const key in resultsMap) {
              promises.push(putResults(key, resultsMap[key]))
            }

            Promise.all(promises)
              .then(() => deleteMsgs(msgData.Messages, QueueUrl))
              .then(() => {
                console.log(`Processed ${msgData.Messages.length} messages`)
                return getMessage()
              })
              .catch(reject)
          }
        })
      }
    })
  })
}

function groupMessagesByHamster (messages) {
  const hamMap = {}

  messages.map((message) => {
    const result = JSON.parse(message.Body)
    if (!hamMap[result.hamsterId]) {
      hamMap[result.hamsterId] = []
    }
    hamMap[result.hamsterId] = hamMap[result.hamsterId].concat(result)
    return result
  })

  return hamMap
}

function putResults (hamsterId, results) {
  return new Promise((resolve, reject) => {
    const getParams = {
      TableName: HAMSTERS_TABLE,
      Key: {
        id: +hamsterId
      }
    }
    client.get(getParams, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        const Item = data.Item

        if (!Item.results) {
          Item.results = []
        }

        Item.results = Item.results.concat(results)

        const putParams = {
          TableName: HAMSTERS_TABLE,
          Item
        }

        client.put(putParams, (err, data) => {
          if (err) reject(err)
          else resolve(data)
        })
      }
    })
  })
}

function deleteMsgs (results, queueUrl) {
  const promises = results.map((result) => {
    return new Promise((resolve, reject) => {
      const params = {
        QueueUrl: queueUrl,
        ReceiptHandle: result.ReceiptHandle
      }
      sqs.deleteMessage(params, (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  })

  return Promise.all(promises)
}
