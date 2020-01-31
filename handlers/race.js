const races = require('../lib/data/races')
const Boom = require('@hapi/boom')

module.exports = async (request) => {
  try {
    const race = await races.get(request.params.id)
    return race
  } catch (err) {
    throw Boom.notFound(err)
  }
}
