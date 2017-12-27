'use strict'

const GoogleAuth = require('google-auth-library')
const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')
const Promise = require('bluebird')
const APIError = require('../helpers/APIError')
const config = require('../../config/config')
const errorCodes = require('../../config/constants').errorCodes
const errorMessages = require('../../config/constants').errorMessages
const successMessages = require('../../config/constants').successMessages

// const auth = require('../models/auth.model')
const debug = require('debug')('better-in-out-api:auth-controller')
const googleAuth = new GoogleAuth()
const googleClient = new googleAuth.OAuth2(config.clientId.android)

async function login(req, res, next) {
  debug('Log in user and create session for device when token is verified')
  try {
    let userProfile, loginPayload
    googleClient.verifyIdToken(req.body.token,
      Object.values(config.clientId), (e, login) => {
        if(e) throw new Error(/*errorCodes.GOOGLE_SIGN_IN_ERROR*/)
        else loginPayload = login.getPayload()
      // var payload = login.getPayload();
      // var userid = payload['sub'];
      // // If request specified a G Suite domain:
      // //var domain = payload['hd'];
    })


  } catch(e) {
    let err
    switch(e.message) {
      default:
        err = new APIError(errorMessages.LOGIN_ERROR, httpStatus.INTERNAL_SERVER_ERROR, true)
        break
    }
  }
}
