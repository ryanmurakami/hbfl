const hamsters = require('../lib/data/hamsters')
const Boom = require('@hapi/boom')

module.exports = async req => {
  try {
    const hamster = await hamsters.get(req.params.id)
    return hamster
  } catch (err) {
    throw Boom.notFound(err)
  }
}
