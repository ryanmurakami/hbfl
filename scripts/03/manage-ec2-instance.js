// Imports
// TODO: Import the aws-sdk

// TODO: Configure region

// Declare local variables
// TODO: Create an ec2 object

function listInstances () {
  // TODO: List instances using ec2.describeInstances()
}

function terminateInstance (instanceId) {
  // TODO: Terminate an instance with a given instanceId
}

listInstances()
.then(data => console.log(data))
// terminateInstance()
// .then(data => console.log(data))
