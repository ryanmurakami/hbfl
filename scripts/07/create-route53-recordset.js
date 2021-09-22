// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: '/* TODO: Add your region */' })

// Declare local variables
const route53 = new AWS.Route53()
const hzId = '/* TODO: Add your hostedzone id */'

createRecordSet(hzId)
.then(data => console.log(data))

function createRecordSet (hzId) {
  // TODO: Create params const
  // Link to ELB Regions:
  // https://docs.aws.amazon.com/general/latest/gr/elb.html

  return new Promise((resolve, reject) => {
    // TODO: Create record set
  })
}
