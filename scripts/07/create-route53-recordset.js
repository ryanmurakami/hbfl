// Imports
const {
  ChangeResourceRecordSetsCommand
} = require('@aws-sdk/client-route-53')
const { sendRoute53Command: sendCommand } = require('./helpers')

// Declare local variables
const hzId = '/* TODO: Add your hostedzone id */'

async function execute () {
  try {
    const response = await createRecordSet(hzId)
    console.log(response)
  } catch (err) {
    console.error('Error creating record set:', err)
  }
}

async function createRecordSet (hzId) {
  // TODO: Create record set
  // Link to ELB Regions:
  // https://docs.aws.amazon.com/general/latest/gr/elb.html
}

execute()
