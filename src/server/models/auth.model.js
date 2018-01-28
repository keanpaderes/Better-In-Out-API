'use strict'

const Joi = require('joi')
const Promise = require('bluebird')
const debug = require('debug')('milk-and-honey-api:auth-model')
const collections = require('../../config/constants').collections
const mongo = require('../../config/db')

/**
* Session Model
*   token: String,
*   email: String,
*   name: String,
*   picture: String
**/

const modelSchema = Joi.object({
  _id: Joi.any().optional(),
  token: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  picture: Joi.string().required()
}).required()

async function createEntry(givenEntry) {
  try {
    let db = await mongo.getDb()

    const query = await db.collection(collections.SESSIONS).insertOne(givenEntry)
    return query.insertedCount
  } catch(e) {
    return false
  }
}

async function retrieveEntry(givenParameters) {
  try {
    let db = await mongo.getDb()
    const query = await db.collection(collections.SESSIONS).findOne(givenParameters)
    return query
  } catch(e) {
    return false
  }
}

async function removeEntry(givenParameters) {
  try {
    let db = await mongo.getDb()

    const query = await db.collection(collections.SESSIONS).deleteOne(givenParameters)
    return query.deletedCount
  } catch(e) {
    return false
  }
}

async function validateModel(result) {
  if (!result) return false

  const {error, value: query} = await Joi.validate(result, modelSchema)
  if (error) return false
  else return true
}

module.exports = {
  createEntry,
  retrieveEntry,
  removeEntry,
  validateModel
}
