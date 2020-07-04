const usersController = require('./user-controller')
const middlewareAuth = require('./middleware-auth')
const userController = require('./user-controller')

module.exports = app => {
  app
    .route('/user/login')
    .post(middlewareAuth.local, usersController.login)

  app
    .route('/user/logout')
    .get(middlewareAuth.bearer, userController.logout)

  app
  .route('/user')
  .post(usersController.add)
  .get(usersController.list)

  app.route('/user/:id').delete(middlewareAuth.bearer, usersController.delete)
}