const AWS = require('aws-sdk')
const hamsters = require('../hamsters')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

const RACE_QUEUE = 'hamster-race-results'
const sqs = new AWS.SQS()

function init () {
  return Promise.resolve(setInterval(async () => {
    try {
      const msg = await poll()
      console.log(`${new Date()} - ${msg}`)
    } catch (err) {
      console.error(`${new Date()} - ${err}`)
    }
  }, 5000))
}

async function poll () {
  let queueData
  let msgData
  // TODO: Create params const for getting queue URL

  try {
    queueData = await sqs.getQueueUrl(params).promise()
  } catch (err) {
    throw new Error(`Error polling SQS queue for messages: ${err}`)
  }

  // TODO: Create params const for receiving message

  try {
    msgData = await sqs.receiveMessages(params).promise()
  } catch (err) {
    throw new Error(`Error receiving messages from SQS queue: ${err}`)
  }

  try {
    if (!msgData.Messages || !msgData.Messages.length) {
      return `No messages in queue ${RACE_QUEUE}`
    } else {
      const resultsMap = groupMessagesByHamster(msgData.Messages)

      for (const key in resultsMap) {
        await putResults(key, resultsMap[key])
      }

      await deleteMsgs(msgData.Messages, queueData.QueueUrl)

      // Call poll recursively to get anymore messages
      poll()
    }
  } catch (err) {
    throw new Error(`Error processing queue messages: ${err}`)
  }
}

async function deleteMsgs (results, queueUrl) {
  for (const result of results) {
    // TODO: Create params const for deleting message

    try {
      await sqs.deleteMessage(params).promise()
    } catch (err) {
      throw new Error(`Error deleting message from SQS Queue: ${err}`)
    }
  }
}

function groupMessagesByHamster (messages) {
  const hamMap = {}

  messages.map(message => {
    const result = JSON.parse(message.Body)
    if (!hamMap[result.hamsterId]) {
      hamMap[result.hamsterId] = []
    }
    hamMap[result.hamsterId] = hamMap[result.hamsterId].concat(result)
    return result
  })

  return hamMap
}

async function putResults (hamsterId, results) {
  try {
    const hamster = await hamsters.get(hamsterId)
    if (!hamster.results) {
      hamster.results = []
    }
    hamster.results = hamster.results.concat(results)
    await hamsters.put(hamster)
  } catch (err) {
    throw new Error(`Error putting hamster results: ${err}`)
  }
}

module.exports = {
  init
}
