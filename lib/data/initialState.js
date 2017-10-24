const hamsters = require('./hamsters')
const races = require('./races')

module.exports = () => {
  const promises = [
    hamsters.getAll(),
    races.getAll()
  ]

  return new Promise((resolve, reject) => {
    Promise.all(promises)
      .then((results) => {
        resolve({
          hamsters: results[0],
          races: results[1]
        })
      })
      .catch(reject)
  })
}
