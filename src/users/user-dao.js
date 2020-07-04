const db = require('../../database')
const { InternalServerError } = require('../errors')

module.exports = {
  add: user => {
    return new Promise((res, rej) => {
      db.run(
        `
        INSERT INTO users (
          name,
          email,
          hashPassword
        ) VALUES (?, ?, ?)
        `,
        [user.name, user.email, user.hashPassword],
        err => {
          if (err) {
            rej(new InternalServerError('Erro ao adicionar o usuário!'))
          }

          return res()
        }
      )
    })
  },

  findById: id => {
    return new Promise((res, rej) => {
      db.get(
        `
        SELECT * FROM users WHERE id = ?
        `,
        [id],
        (err, user) => {
          if (err) {
            return rej('Não foi possível encontrar o usuário!');
          }

          return res(user)
        }
      )
    })
  },

  findByEmail: email => {
    return new Promise((res, rej) => {
      db.get(
        `
        SELECT * FROM users WHERE email = ?
        `,
        [email],
        (err, user) => {
          if (err) {
            return rej('Não foi possível encontrar o usuário!')
          }

          return res(user)
        }
      )
    })
  },

  list: () => {
    return new Promise((res, rej) => {
      db.all(
        `
        SELECT * from users
        `,
        (err, users) => {
          if (err) {
            return rej('Erro ao listar usuários')
          }

          return res(users)
        }
      )
    })
  },

  delete: user => {
    return new Promise((res, rej) => {
      db.run(
        `
        DELETE FROM users
        WHERE id = ?
        `,
        [user.id],
        err => {
          if (err) {
            return rej('Erro ao deletar o usuário')
          }

          return res()
        }
      )
    })
  }
}