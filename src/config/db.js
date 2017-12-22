'use strict'

const MongoClient = require('mongodb').MongoClient
const config = require('./config')
const collections = require('./constants').collections
const APIError = require('../server/helpers/APIError')

const debug = require('debug')('milk-and-honey-api:db')

const mongodbUrl = `mongodb://${config.mongo.user}:${config.mongo.password}@localhost:${config.mongo.port}/${config.mongo.user}?authSource=${config.mongo.auth}`

async function getDb() {
  let db
  try {
    db = await MongoClient.connect(mongodbUrl)
    // Setup index for expiry
    db.collection(collections.SESSIONS).ensureIndex({'expireAt':1}, {expireAfterSeconds:0})
  } catch(e) {
    throw new Error(e)
  }
  return db
}

module.exports = {getDb}
