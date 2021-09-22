// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: '/* TODO: Add your region */' })

// Declare local variables
// TODO: Create route53 object
const hzName = 'hbfl.online'

createHostedZone(hzName)
.then(data => console.log(data))

function createHostedZone (hzName) {
  // TODO: Create params const

  return new Promise((resolve, reject) => {
    // TODO: Create hostedzone with route53
  })
}
