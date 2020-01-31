const hamsters = require('../lib/data/hamsters')
const Boom = require('@hapi/boom')

module.exports = async () => {
  try {
    const allHamsters = await hamsters.getAll()
    return allHamsters
  } catch (err) {
    throw Boom.notFound(err)
  }
}
