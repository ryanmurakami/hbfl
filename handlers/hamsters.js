const hamsters = require('../lib/data/hamsters')
const Boom = require('boom')

module.exports = (request, reply) => {
  hamsters.getAll()
    .then(reply)
    .catch((err) => {
      reply(Boom.notFound(err))
    })
}
