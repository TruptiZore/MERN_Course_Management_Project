const jwt = require('jsonwebtoken')
const config = require('./config')
const result = require('./result')

function authUser(req, res, next) {

  const publicUrls = [
    '/auth/signup',
    '/auth/login',
    '/course/all-active-courses'
  ]

  const url = req.url.split('?')[0]

  if (publicUrls.some(u => url.startsWith(u))) {
    return next()
  }

  const token = req.headers.token
  if (!token) {
    return res.send(result.createResult('Token is missing'))
  }

  try {
    const payload = jwt.verify(token, config.SECRET)
    req.user = payload   // email, role
    next()
  } catch {
    res.send(result.createResult('Token is invalid'))
  }
}

module.exports = authUser
