// Imports
const AWS = require('aws-sdk')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// Declare local variables
const s3 = new AWS.S3()

configureS3Site('/* TODO: Add your S3 bucket name */')
  .then(console.log)
  .catch(console.error)

async function configureS3Site (bucketName) {
  // TODO: Create params const object

  try {
    // Call putBucketWebsite
  } catch (err) {
    throw new Error(`Error configuring S3 Website: ${err}`)
  }
}
