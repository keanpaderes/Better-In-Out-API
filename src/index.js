'use strict'

const config = require('./config/config')
const app = require('./config/express')

const debug = require('debug')('better-in-out-api:index')
const Promise = require('bluebird')
const mongoose = require('mongoose')
mongoose.Promise = Promise

const mongoUri = config.mongo.host
mongoose.connect(mongoUri, { useMongoClient: true }, (err) => {
  if(!err) {
    debug(mongoose.connection.readyState)
  }
})
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
})

if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc)
  })
}



if (!module.parent) {
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`) // eslint-disable-line no-console
  })
}

module.exports =  app
