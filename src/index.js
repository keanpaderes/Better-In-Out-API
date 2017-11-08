'use strict'

const config = require('./config/config')
const app = require('./config/express')

const debug = require('debug')('better-in-out-api:index')
const Promise = require('bluebird')

//mongoose.Promise = Promise


if (!module.parent) {
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`) // eslint-disable-line no-console
  })
}

module.exports =  app
