const simulation = require('../lib/simulation')

function start (request, reply) {
  simulation.start()
    .then(reply)
}

function stop (request, reply) {
  simulation.stop()
    .then(reply)
}

function reset (request, reply) {
  simulation.reset()
    .then(reply)
}

module.exports = {
  start,
  stop,
  reset
}
