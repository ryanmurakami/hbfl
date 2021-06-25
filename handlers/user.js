const users = require('../lib/data/users')
const { pick } = require('lodash')
const Boom = require('@hapi/boom')
const { v4: uuidv4 } = require('uuid')

async function login (req) {
  const {
    password,
    username
  } = req.payload

  if (req.auth.isAuthenticated) {
    return
  }

  try {
    const user = await users.authenticate(username, password)
    const sid = uuidv4()
    const sanitizedUser = pick(user, ['username', 'id'])
    await req.server.app.cache.set(sid, { account: sanitizedUser }, 0)
    req.cookieAuth.set({ sid })
    return sanitizedUser
  } catch (err) {
    throw Boom.unauthorized(err)
  }
}

function logout (req, h) {
  req.cookieAuth.clear()
  return h.redirect('/')
}

async function info (req) {
  if (!req.auth.isAuthenticated) {
    throw Boom.unauthorized('Must login first')
  }

  try {
    const user = await users.get(req.auth.credentials.id)
    return user
  } catch (err) {
    throw Boom.badImplementation(err)
  }
}

async function favorite (req, h) {
  if (!req.auth.isAuthenticated) {
    throw Boom.unauthorized('Must login first')
  }

  try {
    await users.favorite(req.auth.credentials.id, req.params.id)
    return h.response().code(200)
  } catch (err) {
    throw Boom.badImplementation(err)
  }
}

async function unfavorite (req, h) {
  if (!req.auth.isAuthenticated) {
    throw Boom.unauthorized('Must login first')
  }

  try {
    await users.unfavorite(req.auth.credentials.id, req.params.id)
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
