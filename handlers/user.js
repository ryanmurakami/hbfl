const users = require('../lib/data/users')
const { pick } = require('lodash')
const Boom = require('@hapi/boom')
const uuidv4 = require('uuid/v4')

async function login (request, h) {
  const {
    password,
    username
  } = request.payload

  if (request.auth.isAuthenticated) {
    return
  }

  try {
    const user = await users.authenticate(username, password)
    const sid = uuidv4()
    const sanitizedUser = pick(user, ['username', 'id'])
    await request.server.app.cache.set(sid, { account: sanitizedUser }, 0)
    request.cookieAuth.set({ sid })
    return sanitizedUser
  } catch (err) {
    throw Boom.unauthorized(err)
  }
}

function logout (request, h) {
  request.cookieAuth.clear()
  return h.redirect('/')
}

async function info (request) {
  if (!request.auth.isAuthenticated) {
    throw Boom.unauthorized('Must login first')
  }

  try {
    const user = await users.get(request.auth.credentials.id)
    return user
  } catch (err) {
    throw Boom.badImplementation(err)
  }
}

async function favorite (request, h) {
  if (!request.auth.isAuthenticated) {
    throw Boom.unauthorized('Must login first')
  }

  try {
    await users.favorite(request.auth.credentials.id, request.params.id)
    return h.response().code(200)
  } catch (err) {
    throw Boom.badImplementation(err)
  }
}

async function unfavorite (request, h) {
  if (!request.auth.isAuthenticated) {
    throw Boom.unauthorized('Must login first')
  }

  try {
    await users.unfavorite(request.auth.credentials.id, request.params.id)
    return h.response().code(200)
  } catch (err) {
    throw Boom.badImplementation(err)
  }
}

module.exports = {
  login,
  logout,
  info,
  favorite,
  unfavorite
}
