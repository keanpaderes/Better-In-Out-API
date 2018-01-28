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

const auth = require('../models/auth.model')
const debug = require('debug')('better-in-out-api:auth-controller')
const googleAuth = new GoogleAuth()
const googleClient = new googleAuth.OAuth2(config.clientId.android)

async function login(req, res, next) {
  debug('Log in user and create session for device when token is verified')
  try {
    // userProfile
    let loginPayload

    // Verify id token
    googleClient.verifyIdToken(req.body.token,
      Object.values(config.clientId), (e, login) => {
        if(e) throw new Error()
        else loginPayload = login.getPayload()
    })
  // var payload = login.getPayload();
  // var userid = payload['sub'];
  // // If request specified a G Suite domain:
  // //var domain = payload['hd'];

    // Verify hd
    if(!loginPayload.hd || loginPayload.hd !== 'whitewidget.com')
      throw new Error(errorCodes.GSUITE_DOMAIN_ERROR)


  } catch(e) {
    let err
    switch(e.message) {
      case errorCodes.GSUITE_DOMAIN_ERROR:
        err = new APIError(errorMessages.GSUITE_DOMAIN_ERROR, httpStatus.UNAUTHORIZED, true)
        break
      default:
        err = new APIError(errorMessages.LOGIN_ERROR, httpStatus.INTERNAL_SERVER_ERROR, true)
        break
    }
  }
}
