// Imports
// TODO: Import the ec2 client
const helpers = require('./helpers')

function sendCommand (command) {
  // TODO: Create new client with region
  // TODO: Return send command
}

// Declare local variables
const sgName = 'hamster_sg'
const keyName = 'hamster_key'

// Do all the things together
async function execute () {
  try {
    await createSecurityGroup(sgName)
    const keyPair = await createKeyPair(keyName)
    await helpers.persistKeyPair(keyPair)
    const data = await createInstance(sgName, keyName)
    console.log('Created instance with:', data)
  } catch (err) {
    console.error('Failed to create instance with:', err)
  }
}

// Create functions
async function createSecurityGroup (sgName) {
  // TODO: Implement sg creation & setting SSH rule
}

async function createKeyPair (keyName) {
  // TODO: Create keypair
}

async function createInstance (sgName, keyName) {
  // TODO: create ec2 instance
}
