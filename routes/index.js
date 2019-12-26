const handlers = require('../handlers')

module.exports = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: handlers.main,
      auth: false
    }
  }, {
    method: 'GET',
    path: '/public/{path*}',
    config: {
      handler: handlers.public,
      auth: false
    }
  }, {
    method: 'GET',
    path: '/hamsters',
    config: {
      handler: handlers.hamsters,
      auth: false
    }
  }, {
    method: 'GET',
    path: '/hamster/{id}',
    config: {
      handler: handlers.hamster,
      auth: false
    }
  }, {
    method: 'GET',
    path: '/races',
    config: {
      handler: handlers.races,
      auth: false
    }
  }, {
    method: 'GET',
    path: '/race/{id}',
    config: {
      handler: handlers.race,
      auth: false
    }
  }, {
    method: 'POST',
    path: '/login',
    config: {
      handler: handlers.user.login,
      auth: false
    }
  }, {
    method: 'GET',
    path: '/leaderboards',
    config: {
      handler: handlers.leaderboards,
      auth: false
    }
  }, {
    method: 'GET',
    path: '/user',
    config: {
      handler: handlers.user.info
    }
  }, {
    method: 'POST',
    path: '/favorite/{id}',
    config: {
      handler: handlers.user.favorite
    }
  }, {
    method: 'DELETE',
    path: '/favorite/{id}',
    config: {
      handler: handlers.user.unfavorite
    }
  }, {
    method: 'POST',
    path: '/simulation/start',
    config: {
      handler: handlers.simulation.start
    }
  }, {
    method: 'POST',
    path: '/simulation/reset',
    config: {
      handler: handlers.simulation.reset
    }
  }
]
