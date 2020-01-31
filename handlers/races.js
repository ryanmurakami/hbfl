const races = require('../lib/data/races')
const Boom = require('@hapi/boom')

module.exports = async () => {
  try {
    const allRaces = await races.getAll()
    return allRaces
  } catch (err) {
    throw Boom.notFound(err)
  }
}
