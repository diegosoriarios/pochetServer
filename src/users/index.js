module.exports = {
  routes: require('./users-routes'),
  controller: require('./user-controller'),
  model: require('./user-model'),
  auth: require('./auth'),
  midlewareAuth: require('./middleware-auth')
}