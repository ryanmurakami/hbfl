const { writeFile } = require('fs/promises')
const path = require('path')
const os = require('os')

async function persistKeyPair (keyData) {
  const keyPath = path.join(os.homedir(), '.ssh', keyData.KeyName)
  const options = {
    encoding: 'utf8',
    mode: 0o600
  }

  try {
    await writeFile(keyPath, keyData.KeyMaterial, options)
    console.log('Key written to', keyPath)
    return keyData.KeyName
  } catch (err) {
    throw new Error('Error writing keypair locally:', err)
  }
}

module.exports = {
  persistKeyPair
}
