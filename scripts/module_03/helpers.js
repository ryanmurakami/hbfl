const { mkdir, writeFile } = require('fs/promises')
const { existsSync } = require('fs')
const path = require('path')
const os = require('os')

async function persistKeyPair (keyData) {
  const sshDir = path.join(os.homedir(), '.ssh')
  const keyPath = path.join(sshDir, keyData.KeyName)

  if (!existsSync(sshDir)) {
    try {
      console.log('.ssh directory does not exist. Creating it now...')
      await mkdir(sshDir)
      console.log(`.ssh directory created in home => ${sshDir}`)
    } catch (err) {
      throw new Error(`Could not create new .ssh directory in home: ${err}`)
    }
  }

  const options = {
    encoding: 'utf8',
    mode: 0o600
  }

  try {
    await writeFile(keyPath, keyData.KeyMaterial, options)
    console.log('Key successfully written to', keyPath)
    return keyData.KeyName
  } catch (err) {
    throw new Error(`Error saving key locally: ${err}`)
  }
}

module.exports = {
  persistKeyPair
}
