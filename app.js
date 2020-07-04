const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { auth } = require('./src/users')

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

module.exports = app