const usersDao = require('./user-dao')
const { InvalidArgumentError } = require('../errors')
const validations = require('../validations')
const bcrypt = require('bcrypt')

class User {
  constructor(user) {
    this.id = user.id
    this.name = user.name;
    this.email = user.email;
    this.hashPassword = user.hashPassword;

    this.check();
  }

  async add() {
    if (await User.findById(this.email)) {
      throw new InvalidArgumentError('O usuário já existe!');
    }

    return usersDao.add(this)
  }

  async addPassword(password) {
    validations.notNullStringField(password, 'password')
    validations.minFieldSize(password, 'password', 8)
    validations.maxFieldSize(password, 'password', 64)
    this.hashPassword = await User.hashPasswordGenerator(password)
  }

  check() {
    validations.notNullStringField(this.name, 'name')
    validations.notNullStringField(this.email, 'email')
  }

  async delete() {
    return usersDao.delete(this)
  }

  static async findById(id) {
    const user = await usersDao.findById(id)
    if (!user) {
      return null
    }

    return new User(user)
  }

  static async findByEmail(email) {
    const user = await usersDao.findByEmail(email)
    if (!user) {
      return null
    }

    return new User(user)
  }

  static list() {
    return usersDao.list()
  }

  static hashPasswordGenerator(password) {
    const custoHash = 12
    return bcrypt.hash(password, custoHash)
  }
}

module.exports = User