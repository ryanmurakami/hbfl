// Imports
// TODO: Import the ec2 client

function sendCommand (command) {
  const client = new EC2Client({ region: process.env.AWS_REGION })
  return client.send(command)
}

async function listInstances () {
  // TODO: List instances using DescribeInstancesCommand
}

async function terminateInstance (instanceId) {
  // TODO: Terminate an instance with a given instanceId
}

listInstances().then(console.log)
// terminateInstance().then(console.log)
