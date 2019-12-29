const Sequelize = require('sequelize')
const client = require('../mysql.client')

const UserFavorites = client.define('userFavorites', {
  userId: {
    type: Sequelize.INTEGER
  },
  hamsterId: {
    type: Sequelize.INTEGER
  }
})

module.exports = UserFavorites
