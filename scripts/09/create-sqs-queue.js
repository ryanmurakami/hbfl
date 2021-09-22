// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: '/* TODO: Add your region */' })

// Declare local variables
// TODO: Create sqs object
const queueName = 'hamster-race-results'

createQueue(queueName)
.then(data => console.log(data))

function createQueue (queueName) {
  // TODO: Create params const for creating queue

  return new Promise((resolve, reject) => {
    sqs.createQueue(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
