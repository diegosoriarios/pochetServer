const User = require('./user-model')
const { InvalidArgumentError, InternalServerError } = require('../errors')
const jwt = require('jsonwebtoken')
const blacklist = require('../../redis/manage-blacklist')

function generateJWTToken(user) {
  const payload = {
    id: user.id
  }

  const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m' })
  return token
}

module.exports = {
  add: async (req, res) => {
    const { name, email, password } = req.body

    try {
      const user = new User({
        name, email
      })

      await user.addPassword(password)

      await user.add()

      res.status(201).json()
    } catch (err) {
      if (err instanceof InvalidArgumentError) {
        res.status(422).json({ err: err.message });
      } else if (erro instanceof InternalServerError) {
        res.status(500).json({ err: err.message });
      } else {
        res.status(500).json({ err: err.message });
      }
    }
  },

  login: (req, res) => {
    const token = generateJWTToken(req.user)

    res.set('Authorization', token)

    res.status(204).send()
  },

  logout: async (req, res) => {
    try {
      const token = req.token
      await blacklist.add(token)
      res.status(204).send()
    } catch (err) {
      res.status(500).json({ err: err.message })
    }
  },

  list: async (req, res) => {
    const users = await User.list()
    res.json(users)
  },

  delete: async (req, res) => {
    const user = await User.findById(req.params.id)
    try {
      await user.delete()
      res.status(200).send()
    } catch (err) {
      res.status(500).json({ err: err })
    }
  }
}