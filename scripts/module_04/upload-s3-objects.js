// Imports
const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({ region: '/* TODO: Add your region */' })

// Declare local variables
const s3 = new AWS.S3()
const bucketName = '/* TODO: Make this bucket name match what you created */'

helpers.getPublicFiles()
.then(files => uploadS3Objects(bucketName, files))
.then(data => console.log(data))

function uploadS3Objects (bucketName, files) {
  // TODO: Define putObject params object

  const filePromises = files.map((file) => {
    const newParams = Object.assign({}, params, {
      // TODO: Add individual file params
    })

    return new Promise((resolve, reject) => {
      // TODO: Put objects in S3
    })
  })

  return Promise.all(filePromises)
}
