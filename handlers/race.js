const races = require('../lib/data/races')
const Boom = require('@hapi/boom')

module.exports = async req => {
  try {
    const race = await races.get(req.params.id)
    return race
  } catch (err) {
    throw Boom.notFound(err)
  }
}
