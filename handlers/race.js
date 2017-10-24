const races = require('../lib/data/races')
const Boom = require('boom')

module.exports = (request, reply) => {
  races.get(request.params.id)
    .then(reply)
    .catch((err) => {
      reply(Boom.notFound(err))
    })
}
