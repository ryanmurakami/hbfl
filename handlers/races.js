const races = require('../lib/data/races')
const Boom = require('boom')

module.exports = (request, reply) => {
  races.getAll()
    .then(reply)
    .catch((err) => {
      reply(Boom.notFound(err))
    })
}
