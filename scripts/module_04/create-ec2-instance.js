// Imports
const AWS = require('aws-sdk')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// Declare local variables
const ec2 = new AWS.EC2()
const sgName = 'hamster_sg'
const keyName = 'hamster_key'
const instanceId = '/* TODO: Add the instance Id to stop */'

stopInstance(instanceId)
  .then(() => createInstance(sgName, keyName))
  .then((data) => console.log('Created instance with:', data))
  .catch(console.error)

async function createInstance (sgName, keyName) {
  const params = {
    ImageId: '/* TODO: Add ami id for aws linux */',
    InstanceType: 't2.micro',
    KeyName: keyName,
    MaxCount: 1,
    MinCount: 1,
    Placement: {
      AvailabilityZone: '/* TODO: Add the az from the instance that is stopping */'
    },
    SecurityGroups: [
      sgName
    ]
  }

  try {
    await ec2.runInstances(params).promise()
  } catch (err) {
    throw new Error(`Error launching instances: ${err}`)
  }
}

async function stopInstance (instanceId) {
  const params = {
    InstanceIds: [instanceId]
  }

  try {
    await ec2.stopInstances(params).promise()
  } catch (err) {
    throw new Error(`Error stopping Instance: ${err}`)
  }
}
