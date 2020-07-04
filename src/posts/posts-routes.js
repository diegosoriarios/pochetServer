const postController = require('./posts-controller')
const { midlewareAuth } = require('../users')

module.exports = app => {
  app
  .route('/post')
  .get(postController.list)
  .post(midlewareAuth.bearer, postController.add)
}