const users = require('../lib/data/users')
const Boom = require('@hapi/boom')

module.exports = async () => {
  try {
    const allUsers = await users.getAll()
    const rank = rankUsers(allUsers)
    return rank
  } catch (err) {
    throw Boom.badImplementation(err)
  }
}

function rankUsers (users) {
  const totalledUsers = users.map((user) => {
    const totalPoints = user.favorites.reduce((sum, hamster) => {
      return sum + hamster.totalPoints
    }, 0)

    return {
      ...user,
      totalPoints,
      avgPoints: totalPoints / user.favorites.length
    }
  })

  const sortedUsers = totalledUsers.sort((a, b) => {
    if (a.avgPoints > b.avgPoints) return 1
    if (a.avgPoints < b.avgPoints) return -1
    return 0
  })

  return sortedUsers.map((user, i) => ({
    name: user.username,
    id: user.id,
    avgPoints: user.avgPoints,
    totalPoints: user.totalPoints,
    rank: i + 1
  }))
}
