const Sequelize = require('sequelize')
const client = require('../mysql.client')

const User = client.define('user', {
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
})

module.exports = User
