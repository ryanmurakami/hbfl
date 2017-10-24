const hamsters = require('../lib/data/hamsters')
const Boom = require('boom')

module.exports = (request, reply) => {
  hamsters.get(request.params.id)
    .then(reply)
    .catch((err) => {
      reply(Boom.notFound(err))
    })
}
