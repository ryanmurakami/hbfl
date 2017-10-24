// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: '/* TODO: Add your region */' })

// Declare local variables
const ec2 = new AWS.EC2()
const volumeId = '/* TODO: Add the volume to detach/attach */'
const instanceId = '/* TODO: Add the instance to attach to */'

detachVolume(volumeId)
.then(() => attachVolume(instanceId, volumeId))

function detachVolume (volumeId) {
  // TODO: Configure detachVolume params

  return new Promise((resolve, reject) => {
    // TODO: Detach the volume
  })
}

function attachVolume (instanceId, volumeId) {
  // TODO: Configure attachVolume params

  return new Promise((resolve, reject) => {
    // TODO: Attach the volume
  })
}
