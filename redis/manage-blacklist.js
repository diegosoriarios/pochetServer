const blacklist = require('./blacklist')

const { promisify } = require('util')
const existsAsync = promisify(blacklist.exists).bind(blacklist)
const setAsync = promisify(blacklist.set).bind(blacklist)
const jwt = require('jsonwebtoken')
const { createHash } = require('crypto')

function generateHashToken(token) {
  return createHash('sha256').update(token).digest('hex')
}

module.exports = {
  add: async token => {
    const expirationDate = jwt.decode(token).exp
    const tokenHash = generateHashToken(token)
    await setAsync(tokenHash, '')
    blacklist.expireat(token, expirationDate)
  },
  hasToken: async token => {
    const tokenHash = generateHashToken(token)
    const result = await existsAsync(tokenHash)
    return result === 1
  }
}