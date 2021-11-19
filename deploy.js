const archiver = require('archiver')
const ProgressBar = require('progress')
const fs = require('fs')
const path = require('path')
const os = require('os')
const client = require('scp2')
const exec = require('ssh-exec')

const archivePath = path.join(__dirname, 'archive.zip')

const output = fs.createWriteStream(archivePath)
const archive = archiver('zip', {
  zlib: { level: 9 }
})

let bar
let len
let prevProgress = 0

output.on('close', () => {
  const ip = process.argv[2]

  console.log('\nArchiving Complete')

  upload(archivePath, ip)
  .then(() => {
    console.log('\nUploading Complete')
    return unpack(ip)
  })
  .then(() => {
    console.log('Deployment Complete')
  })
  .catch(err => console.error(err))
})

archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.error('ENOENT', err)
  } else {
    throw err
  }
})

archive.on('progress', (progress) => {
  if (!len || len !== progress.entries.total) {
    len = progress.entries.total
    bar = new ProgressBar('Archiving [:bar] :percent :etas remaining', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: len
    })
  } else {
    bar.tick(progress.entries.processed - prevProgress)
    prevProgress = progress.entries.processed
  }
})

archive.on('error', (err) => {
  throw err
})

archive.pipe(output)

archive.directory('app/', 'app')
archive.directory('handlers/', 'handlers')
archive.directory('lib/', 'lib')
archive.directory('plugins/', 'plugins')
archive.directory('public/', 'public')
archive.directory('routes/', 'routes')
archive.directory('util/', 'util')
archive.append(fs.createReadStream(path.join(__dirname, '.env')), { name: '.env' })
archive.append(fs.createReadStream(path.join(__dirname, 'index.js')), { name: 'index.js' })
archive.append(fs.createReadStream(path.join(__dirname, 'package.json')), { name: 'package.json' })
archive.append(fs.createReadStream(path.join(__dirname, 'package-lock.json')), { name: 'package-lock.json' })
archive.append(fs.createReadStream(path.join(__dirname, 'webpack.config.js')), { name: 'webpack.config.js' })

archive.finalize()

function upload (file, ip) {
  let uploadBar
  let uploadLen
  let prevProgress = 0

  return new Promise((resolve, reject) => {
    const myClient = new client.Client()
    myClient.on('transfer', (buffer, uploaded, total) => {
      if (!uploadLen || uploaded === total) {
        uploadLen = +total
        uploadBar = new ProgressBar('Uploading [:bar] :percent :etas remaining', {
          complete: '=',
          incomplete: ' ',
          width: 20,
          total: uploadLen
        })
      } else {
        uploadBar.tick(uploaded - prevProgress)
        prevProgress = uploaded
      }
    })

    client.scp(file, {
      host: ip,
      username: 'bitnami',
      privateKey: require('fs').readFileSync(path.join(os.homedir(), '.ssh', 'hamster_key')),
      path: '/home/bitnami/'
    },
    myClient,
    (err) => {
      if (err) reject(err)
      else resolve('Successfully Uploaded')
    })
  })
}

function unpack (ip) {
  return new Promise((resolve, reject) => {
    const command = 'cd /home/bitnami && ' +
      'unzip -o -q ./archive.zip -d hbfl && ' +
      'cd hbfl && ' +
      'npm ci && ' + // installs dependencies
      'kill -9 $(pgrep -f node | grep -v ^$$\\$) && ' + // this kills any existing node processes except self
      'npm start' // starts app

    exec(command, {
      user: 'bitnami',
      host: ip,
      key: require('fs').readFileSync(path.join(os.homedir(), '.ssh', 'hamster_key'))
    }).pipe(process.stdout)
  })
}
