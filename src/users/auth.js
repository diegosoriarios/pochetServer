const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bearerStrategy = require('passport-http-bearer').Strategy

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./user-model')
const blacklist = require('../../redis/manage-blacklist')

const { InvalidArgumentError }  = require('../errors')

function userExists(user) {
  if (!user) {
    throw new InvalidArgumentError("Não existe usuário")
  }
}

async function comparePassword(password, hashPassword) {
  const validPassword = await bcrypt.compare(passport, hashPassword)
  if (!validPassword) {
    throw new InvalidArgumentError('E-mail ou senha invalidos')
  }
}

async function checkBlacklistToken(token) {
  const blacklistToken = await blacklist.hasToken(token)
  if (blacklistToken) {
    throw new jwt.JsonWebTokenError('Token invalido')
  }
}

passport.use(
  new localStrategy({
    usernameField: 'email',
    session: false
  }, async (email, password, done) => {
    try {
      const user = await User.findByEmail(email)
      userExists(user)
      await comparePassword(password, user.hashPassword)

      done(null, user)
    } catch (err) {
      done(err)
    }

  })
)

passport.use(
  new bearerStrategy(async (token, done) => {
    try {
      await checkBlacklistToken(token)
      const payload = jwt.verify(token, process.env.CHAVE_JWT)
      const user = await User.findById(payload.id)
      done(null, user, { token: token })
    } catch (err) {
      done(err)
    }
  })
)