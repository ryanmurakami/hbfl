// Imports
const AWS = require('aws-sdk')
const config = require('config')

const awsRegion = config.get('aws.region')
AWS.config.update({ region: awsRegion })

// Declare local variables
const ec2 = new AWS.EC2()
const volumeId = '/* TODO: Add the volume to detach/attach */'
const instanceId = '/* TODO: Add the instance to attach to */'

detachVolume(volumeId)
  .then(() => attachVolume(instanceId, volumeId))
  .catch(console.error)

async function detachVolume (volumeId) {
  // TODO: Configure detachVolume params

  try {
    // TODO: Detach the volume
  } catch (err) {
    throw new Error(`Error detaching Volume from Instance: ${err}`)
  }
}

async function attachVolume (instanceId, volumeId) {
  // TODO: Configure attachVolume params

  try {
    // TODO: Attach the volume
  } catch (err) {
    throw new Error(`Error attaching Volume to Instance: ${err}`)
  }
}
