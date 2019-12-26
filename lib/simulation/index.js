const { resolveRace } = require('./resolution')
const races = require('../data/races')
const hamsters = require('../data/hamsters')

async function start () {
  const allRaces = await races.getAll()
  for (const race of allRaces) {
    console.log(`${race.venue} started`)
    const results = await resolveRace(race)
    console.log(`${race.venue} complete`)
    console.log(results)
  }

  console.log('All races complete')
}

async function reset () {
  await races.clearResults()
  console.log('Race results cleared')
  await hamsters.clearResults()
  console.log('Hamster results cleared')
}

module.exports = {
  start,
  reset
}
