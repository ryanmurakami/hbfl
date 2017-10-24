const Promise = require('bluebird')
const Spinner = require('cli-spinner').Spinner
const { resolveRace } = require('./resolution')
const races = require('../data/races')
const hamsters = require('../data/hamsters')

let activeSpinner
let active
let activeTimeout

function start () {
  return new Promise((resolve) => {
    if (active) {
      console.log('Races already started')
    }

    races.getAll()
      .then((allRaces) => {
        active = Promise
          .each(allRaces, (race) => {
            return new Promise((resolve, reject) => {
              console.log(`${race.venue} started`)
              activeSpinner = new Spinner({
                text: `Hamsters racing at ${race.venue} %s`
              })

              activeSpinner.setSpinnerString(19)
              activeSpinner.start()

              activeTimeout = setTimeout(() => {
                activeSpinner.stop(true)
                console.log(`${race.venue} complete`)
                resolveRace(race)
                  .then((results) => {
                    console.log(results)
                    resolve()
                  })
              }, race.length)
            })
          })
          .then(() => {
            active = null
            console.log('All races complete')
            resolve()
          })
      })
  })
}

function stop () {
  return new Promise((resolve) => {
    activeSpinner.stop(true)
    if (active) active.cancel()
    clearTimeout(activeTimeout)
    active = null
    console.log('Races stopped')
    resolve()
  })
}

function reset () {
  return new Promise((resolve) => {
    races.clearResults()
      .then(() => {
        console.log('Race results cleared')
        return hamsters.clearResults()
      })
      .then(() => {
        console.log('Hamster results cleared')
        resolve()
      })
  })
}

module.exports = {
  start,
  stop,
  reset
}
