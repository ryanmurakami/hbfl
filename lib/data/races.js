const dataSource = require('./lib/mock').Race
const TableName = 'races'

function getAll () {
  return dataSource.getAll(TableName)
}

function get (id) {
  return dataSource.get('races', id)
}

function clearResults () {
  return dataSource.getAll(TableName)
    .then((races) => {
      races.map((race) => {
        race.results = []
        dataSource.put(TableName, race)
      })
    })
}

module.exports = {
  get,
  getAll,
  clearResults
}
