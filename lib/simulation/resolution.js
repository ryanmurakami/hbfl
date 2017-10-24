const arrayShuffle = require('array-shuffle')
const hamsters = require('../data/hamsters')
const { push } = require('../data/lib/sqs')
const { send } = require('../data/lib/kinesis')

const RACE_QUEUE = 'hamster-race-results'
const KINESIS_STREAM_NAME = 'hamster-race-results'
const PARTITION_KEY = 'hbfl-partition'

function resolveRace (race) {
  return new Promise((resolve, reject) => {
    hamsters
      .getAll()
      .then((hamsters) => {
        const results = arrayShuffle(hamsters)
        sendResults(race, results)
        resolve(results.map((hamster, i) =>
          `${i + 1}: ${hamster.name}`
        ))
      })
  })
}

function sendResults (race, results) {
  results.map((hamster, i) => {
    const result = {
      hamsterId: hamster.id,
      raceId: race.id,
      place: i + 1
    }

    push(RACE_QUEUE, result)
  })

  const cleanResults = results.map((hamster, i) => {
    return { hamsterId: hamster.id, place: i + 1 }
  })
  send(KINESIS_STREAM_NAME, PARTITION_KEY, { race, results: cleanResults })
}

module.exports = { resolveRace }
