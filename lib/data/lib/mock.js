const { find, remove } = require('lodash')
const assets = require('../../../util/assets')
const userData = []
const hamsterData = [
  {
    id: 1,
    name: 'Zepto',
    type: 'Speedball',
    src: assets.hamster1,
    results: []
  }, {
    id: 2,
    name: 'Milkshake',
    type: 'Speedball',
    src: assets.hamster2,
    results: []
  }, {
    id: 3,
    name: 'Fievel',
    type: 'Tiny Terror',
    src: assets.hamster3,
    results: []
  }, {
    id: 4,
    name: 'Baby Ham',
    type: 'Roller',
    src: assets.hamster4,
    results: []
  }, {
    id: 5,
    name: 'Tater',
    type: 'Stealth',
    src: assets.hamster5,
    results: []
  }, {
    id: 6,
    name: 'Peter Pan',
    type: 'ZigZagger',
    src: assets.hamster6,
    results: []
  }
]
const favorites = []
const raceData = [
  {
    id: 1,
    venue: 'Petco 2000',
    city: 'Seattle, WA',
    date: '04/29/22',
    results: []
  }, {
    id: 2,
    venue: 'Triscuit Circuit 4700',
    city: 'Daytona Beach, FL',
    date: '09/21/22',
    results: []
  }, {
    id: 3,
    venue: 'Kraft 35',
    city: 'Tokyo, Japan',
    date: '07/14/22',
    results: []
  }
]

const User = {
  sync () { return Promise.resolve() },
  findOne (query) {
    console.log(query, userData)
    return Promise.resolve(find(userData,
      u => u.username === query.where.username || u.id === query.where.id))
  },
  findAll (query) {
    return Promise.resolve(userData.map(u => ({ [query.attributes[0]]: u[query.attributes[0]] })))
  },
  create (user) {
    user.id = userData.length + 1
    userData.push(user)
    return Promise.resolve()
  }
}

const UserFavorite = {
  sync () { return Promise.resolve() },
  findAll (query) {
    return Promise.resolve(favorites.filter(f => f.userId === query.where.userId))
  },
  destroy (query) {
    remove(favorites, f =>
      f.userId === +query.where.userId && f.hamsterId === +query.where.hamsterId)
    return Promise.resolve()
  },
  create (favorite) {
    remove(favorites, (f) => {
      return f.userId === favorite.userId &&
        f.hamsterId === favorite.hamsterId
    })
    favorites.push(favorite)
    return Promise.resolve()
  }
}

const Hamster = {
  getAll () {
    return Promise.resolve(hamsterData)
  },
  put (hamster) {
    remove(hamsterData, (h) => {
      return h.id === hamster.id
    })
    hamsterData.push(hamster)
    return Promise.resolve()
  }
}

const Race = {
  get (table, id) {
    return Promise.resolve(find(raceData, r => r.id === id))
  },
  getAll () {
    return Promise.resolve(raceData)
  },
  put (race) {
    remove(raceData, (r) => {
      return r.id === race.id
    })
    raceData.push(race)
    return Promise.resolve()
  }
}

module.exports = {
  User,
  UserFavorite,
  Hamster,
  Race
}
