// Imports
const AWS = require('aws-sdk')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// Declare local variables
const route53 = new AWS.Route53()
const hzId = '/* TODO: Add your hostedzone id */'

createRecordSet(hzId)
  .then(console.log)
  .catch(console.error)

async function createRecordSet (hzId) {
  // TODO: Create params const
  // Link to ELB Regions:
  // https://docs.aws.amazon.com/general/latest/gr/elb.html

  try {
    // TODO: Create record set
  } catch (err) {
    throw new Error(`Error creating Route 53 Record Set: ${err}`)
  }
}
