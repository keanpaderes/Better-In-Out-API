'use strict'

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compress = require('compression')
const methodOverride = require('method-override')
const cors = require('cors')
const httpStatus = require('http-status')
const expressPrettify = require('express-prettify')
const expressWinston = require('express-winston')
const expressValidation = require('express-validation')
const helmet = require('helmet')
const winstonInstance = require('./winston')
const config = require('./config')

const app = express()

if (config.env === 'development') {
  app.use(logger('dev'))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser())
app.use(compress())
app.use(methodOverride())

app.use(helmet())
app.use(cors())

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body')
  expressWinston.responseWhitelist.push('body')
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }))
}

// TODO if error is not an instanceOf APIError, convert it.
// TODO catch 404 and forward to error handler

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }))
}

// enable prettify of api when added as query
app.use(expressPrettify({ query: 'pretty' }))

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {}
  })
)

module.exports = app
