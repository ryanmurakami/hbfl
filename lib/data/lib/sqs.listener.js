const AWS = require('aws-sdk')
const hamsters = require('../hamsters')

const RACE_QUEUE = 'hamster-race-results'

AWS.config.update({ region: '/* TODO: Add your region */' })

const sqs = new AWS.SQS()

function init () {
  return Promise.resolve(setInterval(() => {
    poll()
    .then(msg => console.log(`${new Date()} - ${msg}`))
    .catch(err => console.error(`${new Date()} - ${err}`))
  }, 5000))
}

function poll () {
  // TODO: Create params const for getting queue URL

  return new Promise((resolve, reject) => {
    sqs.getQueueUrl(params, (err, queueData) => {
      if (err) reject(err)
      else {
        // TODO: Create params const for receiving message

        sqs.receiveMessage(params, (err, msgData) => {
          if (err) reject(err)
          else if (!msgData.Messages || !msgData.Messages.length) {
            resolve(`No messages in queue ${RACE_QUEUE}`)
          } else {
            Promise.all(getPutHamsterPromises(msgData.Messages))
            .then(() => deleteMsgs(msgData.Messages, queueData.QueueUrl))
            .then(() => {
              console.log(`Processed ${msgData.Messages.length} messages from SQS`)
              return poll()
            })
            .catch(reject)
          }
        })
      }
    })
  })
}

function deleteMsgs (results, queueUrl) {
  const promises = results.map((result) => {
    // TODO: Create params const for deleting message

    return new Promise((resolve, reject) => {
      sqs.deleteMessage(params, (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  })

  return Promise.all(promises)
}

function getPutHamsterPromises (messages) {
  const resultsMap = groupMessagesByHamster(messages)
  const promises = []

  for (const key in resultsMap) {
    promises.push(putResults(key, resultsMap[key]))
  }

  return promises
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
    hamsters.get(hamsterId)
    .then((hamster) => {
      if (!hamster.results) {
        hamster.results = []
      }

      hamster.results = hamster.results.concat(results)
      return hamsters.put(hamster)
    })
    .then(resolve)
    .catch(reject)
  })
}

module.exports = {
  init
}
