// Imports
const AWS = require('aws-sdk')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// Declare local variables
// TODO: Create route53 object
const hzName = 'hbfl.online'

createHostedZone(hzName)
  .then(console.log)
  .catch(console.error)

async function createHostedZone (hzName) {
  // TODO: Create params const

  try {
    // TODO: Create hostedzone with route53
  } catch (err) {
    throw new Error(`Error creating Route 53 Hosted Zone: ${err}`)
  }
}
