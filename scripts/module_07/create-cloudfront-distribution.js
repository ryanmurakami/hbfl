// Imports
const AWS = require('aws-sdk')
const cfParams = require('./cloudfront-parameters')

AWS.config.update({ region: '/* TODO: Add your region */' })

// Declare local variables
// TODO: Create CloudFront SDK Object

createDistribution('/* TODO: Add your bucket name */')
.then(data => console.log(data))

function createDistribution (bucketName) {
  // TODO: Create params const object

  return new Promise((resolve, reject) => {
    // TODO: Call createDistribution
  })
}
