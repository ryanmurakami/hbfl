const { start, stop, reset } = require('./index')

function listener () {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', function (data) {
    data = (data + '').trim().toLowerCase()

    // if the keys entered match the restartable value, then restart!
    if (data === 'start') {
      start()
    } else if (data === 'stop') {
      stop()
    } else if (data === 'reset') {
      reset()
    }
  })
}

module.exports = { listener }
