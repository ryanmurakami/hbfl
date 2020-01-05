const { find } = require('lodash')
const dataSource = require('./lib/mock').Hamster
const TableName = 'hamsters'

async function getAll () {
  const hamsters = await dataSource.getAll(TableName)
  const updatedHamsters = updateRank(hamsters)
  return updatedHamsters
}

async function get (id) {
  const hamsters = await getAll()
  return find(hamsters, hamster => hamster.id === +id)
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

  return totalledHamsters.map((hamster, i) => {
    if (hamster.totalPoints > 0) hamster.rank = i + 1
    return hamster
  })
}

async function clearResults () {
  const hamsters = await dataSource.getAll(TableName)
  return hamsters.map((hamster) => {
    hamster.results = []
    hamster.rank = 'N/A'
    dataSource.put(TableName, hamster)
  })
}

function put (hamster) {
  if (!hamster.avgPoints) hamster.avgPoints = 0
  return dataSource.put(TableName, hamster)
}

module.exports = {
  get,
  getAll,
  clearResults,
  put
}
