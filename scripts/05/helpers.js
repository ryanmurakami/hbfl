const { EC2Client } = require('@aws-sdk/client-ec2')
const { S3Client } = require('@aws-sdk/client-s3')
const glob = require('glob')
const fs = require('fs')

async function sendCommand (command) {
  const client = new EC2Client({ region: process.env.AWS_REGION })
  return client.send(command)
}

async function sendS3Command (command) {
  const client = new S3Client({ region: process.env.AWS_REGION })
  return client.send(command)
}

function getPublicFiles () {
  return new Promise((resolve, reject) => {
    glob('../../public/**/*.*', (err, files) => {
      if (err) reject(err)
      else {
        const filePromises = files.map((file) => {
          return new Promise((resolve, reject) => {
            fs.readFile(file, (err, data) => {
              if (err) reject(err)
              else resolve(data)
            })
          })
        })

        Promise.all(filePromises)
        .then((fileContents) => {
          return fileContents.map((contents, i) => {
            return {
              contents,
              name: files[i].replace('../../public/', '')
            }
          })
        })
        .then(resolve)
        .catch(reject)
      }
    })
  })
}

function getContentType (filename) {
  if (filename.match(/\.html/)) {
    return 'text/html'
  }
  if (filename.match(/\.png/)) {
    return 'image/png'
  }
  if (filename.match(/\.jpg/)) {
    return 'image/jpeg'
  }
  if (filename.match(/\.js/)) {
    return 'text/javascript'
  }
  if (filename.match(/\.css/)) {
    return 'text/css'
  }
}

// Borrowed from https://www.sitepoint.com/delay-sleep-pause-wait/
function sleep (s) {
  return new Promise(resolve => setTimeout(resolve, s * 1000))
}

module.exports = {
  getPublicFiles,
  getContentType,
  sendCommand,
  sendS3Command,
  sleep
}
