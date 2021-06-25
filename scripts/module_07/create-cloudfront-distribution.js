// Imports
const AWS = require('aws-sdk')
const config = require('config')

const cfParams = require('./cloudfront-parameters')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// Declare local variables
// TODO: Create CloudFront SDK Object

createDistribution('/* TODO: Add your bucket name */')
  .then(console.log)
  .catch(console.error)

async function createDistribution (bucketName) {
  // TODO: Create params const object

  try {
    // TODO: Call createDistribution
  } catch (err) {
    throw new Error(`Error creating CloudFront Distribution: ${err}`)
  }
}
