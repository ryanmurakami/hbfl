// Imports
const AWS = require('aws-sdk')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// Declare local variables
// TODO: Create new s3 object

createBucket('hamster-bucket/* TODO: Add a unique identifier */')
  .then((data) => console.log(data))
  .catch(console.error)

async function createBucket (bucketName) {
  // TODO: Define params object

  try {
    // TODO: Create s3 bucket
  } catch (err) {
    throw new Error(`Error creating S3 Bucket: ${err}`)
  }
}
