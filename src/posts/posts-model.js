const postsDao = require('./posts-dao')
const validations = require('../validations')

class Post {
  constructor(post) {
    this.title = post.title
    this.content = post.content
    this.check()
  }

  check() {
    return postsDao.add(this)
  }

  validate() {
    validations.notNullStringField(this.title, 'title')
    validations.minFieldSize(this.title, 'title', 5)

    validations.notNullStringField(this.content, 'content')
    validations.maxFieldSize(this.content, 'content', 140)
  }

  static list() {
    return postsDao.list()
  }
}

module.exports = Post