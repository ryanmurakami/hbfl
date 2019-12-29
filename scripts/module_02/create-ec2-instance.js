// Imports
// TODO: Import the aws-sdk
const helpers = require('./helpers')

// TODO: Configure region

// Declare local variables
// TODO: Create an ec2 object
const sgName = 'hamster_sg'
const keyName = 'hamster_key'

// Do all the things together
createSecurityGroup(sgName)
.then(() => {
  return createKeyPair(keyName)
})
.then(helpers.persistKeyPair)
.then(() => {
  return createInstance(sgName, keyName)
})
.then((data) => {
  console.log('Created instance with:', data)
})
.catch((err) => {
  console.error('Failed to create instance with:', err)
})

// Create functions

function createSecurityGroup (sgName) {
  // TODO: Implement sg creation & setting SSH rule
}

function createKeyPair (keyName) {
  // TODO: Create keypair
}

function createInstance (sgName, keyName) {
  // TODO: create ec2 instance
}
