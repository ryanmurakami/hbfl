const users = require('../lib/data/users')
const _ = require('lodash')
const Boom = require('boom')
const uuidv4 = require('uuid/v4')

function login (request, reply) {
  if (request.auth.isAuthenticated) {
    return reply()
  }

  users.authenticate(
    request.payload.username,
    request.payload.password
  )
    .then((user) => {
      const sid = uuidv4()
      const sanitizedUser = _.pick(user, ['username', 'id'])
      request.server.app.cache.set(sid, { account: sanitizedUser }, 0, (err) => {
        if (err) console.error(err)
        request.cookieAuth.set({ sid })
        return reply(sanitizedUser)
      })
    })
    .catch((err) => {
      reply(Boom.unauthorized(err))
    })
}

function logout (request, reply) {
  request.cookieAuth.clear()
  return reply.redirect('/')
}

function info (request, reply) {
  if (!request.auth.isAuthenticated) {
    return reply(Boom.unauthorized('Must login first'))
  }

  users.get(request.auth.credentials.id)
    .then(user => reply(user))
    .catch(err => reply(Boom.badImplementation(err)))
}

function favorite (request, reply) {
  if (!request.auth.isAuthenticated) {
    return reply(Boom.unauthorized('Must login first'))
  }

  users.favorite(request.auth.credentials.id, request.params.id)
    .then(() => reply())
    .catch(err => reply(Boom.badImplementation(err)))
}

function unfavorite (request, reply) {
  if (!request.auth.isAuthenticated) {
    return reply(Boom.unauthorized('Must login first'))
  }

  users.unfavorite(request.auth.credentials.id, request.params.id)
    .then(() => reply())
    .catch(err => reply(Boom.badImplementation(err)))
}

module.exports = {
  login,
  logout,
  info,
  favorite,
  unfavorite
}
