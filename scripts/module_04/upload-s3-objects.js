// Imports
const AWS = require('aws-sdk')
const config = require('config')

const helpers = require('./helpers')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// Declare local variables
const s3 = new AWS.S3()
const bucketName = '/* TODO: Make this bucket name match what you created */'

helpers.getPublicFiles()
  .then(files => uploadS3Objects(bucketName, files))
  .then(console.log)
  .catch(console.error)

async function uploadS3Objects (bucketName, files) {
  // TODO: Define putObject params object

  const filePromises = files.map(async file => {
    const newParams = Object.assign({}, params, {
      // TODO: Add individual file params
    })

    try {
      // TODO: Put objects in S3
    } catch (err) {
      throw new Error(`Error putting Objects in S3 Bucket: ${err}`)
    }
  })

  return Promise.all(filePromises)
}
