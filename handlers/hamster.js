const hamsters = require('../lib/data/hamsters')
const Boom = require('@hapi/boom')

module.exports = async (request) => {
  try {
    const hamster = await hamsters.get(request.params.id)
    return hamster
  } catch (err) {
    throw Boom.notFound(err)
  }
}
