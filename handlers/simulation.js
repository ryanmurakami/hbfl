const simulation = require('../lib/simulation')

async function start (request, h) {
  await simulation.start()
  return h.response().code(200)
}

async function reset (request, h) {
  await simulation.reset()
  return h.response().code(200)
}

module.exports = {
  start,
  reset
}
