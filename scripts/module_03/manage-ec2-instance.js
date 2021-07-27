// Imports
// TODO: Import the aws-sdk

// TODO: Configure region

// Declare local variables
// TODO: Create an ec2 object

async function listInstances () {
  // TODO: List instances using ec2.describeInstances()
}

async function terminateInstance (instanceId) {
  // TODO: Terminate an instance with a given instanceId
}

listInstances()
  .then(console.log)
  .catch(console.error)
// terminateInstance()
//   .then(console.log)
//   .catch(console.error)
