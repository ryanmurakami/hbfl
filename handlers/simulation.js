const simulation = require('../lib/simulation')

async function start (_, h) {
  await simulation.start()
  return h.response().code(200)
}

async function reset (_, h) {
  await simulation.reset()
  return h.response().code(200)
}

module.exports = {
  start,
  reset
}
