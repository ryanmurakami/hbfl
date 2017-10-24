const _ = require('lodash')
const dataSource = require('./lib/mock').Hamster
const TableName = 'hamsters'

function getAll () {
  return new Promise((resolve, reject) => {
    dataSource.getAll(TableName)
      .then(updateRank)
      .then(resolve)
      .catch(reject)
  })
}

function get (id) {
  return new Promise((resolve) => {
    getAll()
      .then((hamsters) => {
        resolve(_.find(hamsters, hamster => hamster.id === +id))
      })
  })
}

function updateRank (hamsters) {
  const totalledHamsters = hamsters.map((hamster) => {
    hamster.totalPoints =
      Object.values(hamster.results).reduce((sum, hamster) => {
        return sum + hamster.place
      }, 0)
    hamster.avgPoints = hamster.totalPoints / hamster.results.length
    return hamster
  })

  totalledHamsters.sort((a, b) => {
    if (a.avgPoints > b.avgPoints) return 1
    if (a.avgPoints < b.avgPoints) return -1
    return 0
  })

  return Promise.resolve(totalledHamsters.map((hamster, i) => {
    if (hamster.totalPoints > 0) hamster.rank = i + 1
    return hamster
  }))
}

function clearResults () {
  return dataSource.getAll(TableName)
    .then((hamsters) => {
      hamsters.map((hamster) => {
        hamster.results = []
        hamster.rank = 'N/A'
        dataSource.put(TableName, hamster)
      })
    })
}

module.exports = {
  get,
  getAll,
  clearResults
}
