'use strict'

const Joi = require('joi')

const auth = {
  login : {
    body: {
      token: Joi.string().required(),
      uuid: Joi.string().required()
    }
  },
  logout: {
    body: {
      uuid: Joi.string().required()
    }
  }
}

module.exports = {auth}
