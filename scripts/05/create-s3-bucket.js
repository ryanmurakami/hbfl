// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: '/* TODO: Add your region */' })

// Declare local variables
// TODO: Create new s3 object

createBucket('hamster-bucket/* TODO: Add a unique identifier */')
.then((data) => console.log(data))

function createBucket (bucketName) {
  // TODO: Define params object

  return new Promise((resolve, reject) => {
    // TODO: Create s3 bucket
  })
}
