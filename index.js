const Hapi = require('hapi')
const plugins = require('./plugins')
const routes = require('./routes')
const { init } = require('./lib/data/users')
const register = require('./lib/simulation/register')
const { init: queueInit } = require('./lib/data/lib/sqs.listener')

const options = {
  // Commented out until Elasticache is configured
  // cache: [{
  //   name: 'redis',
  //   engine: require('catbox-redis'),
  //   host: 'hamster.792iyi.0001.use1.cache.amazonaws.com',
  //   partition: 'cache'
  // }]
}
const server = new Hapi.Server(options)
server.connection({ port: process.env.PORT || 3000 })

server.register(plugins, (err) => {
  if (err) throw err

  // hapi-auth-cookie stuff
  const cache = server.cache({
    // cache: 'redis',
    segment: 'sessions',
    expiresIn: 3 * 24 * 60 * 60 * 1000
  })
  server.app.cache = cache

  server.ext('onPreHandler', (req, reply) => {
    req.info.acceptEncoding = null
    reply.continue()
  })

  server.auth.strategy('session', 'cookie', true, {
    password: 'password-should-be-32-characters',
    cookie: 'hbfl-sid',
    isSecure: false,
    validateFunc: function (request, session, callback) {
      cache.get(session.sid, (err, cached) => {
        if (err) {
          return callback(err, false)
        }

        if (!cached) {
          return callback(null, false)
        }

        return callback(null, true, cached.account)
      })
    }
  })

  // register routes
  server.route(routes)

  // initialize database and start server
  init()
  // Commented out until SQS is configured
  // .then(() => queueInit())
  .then(() => {
    server.start((err) => {
      if (err) throw err
      console.log(`Server started at http://localhost:${server.info.port}`)
      register.listener()
    })
  })
})
