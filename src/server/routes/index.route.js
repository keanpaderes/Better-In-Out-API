'use strict'

const express = require('express')

const router = express.Router() // eslint-disable-line new-cap

/** GET /hello - Hello world route */
router.get('/hello', (req, res) => res.json({
  'code': res.statusCode,
  'message': 'Hello World!'
}))

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>res.json({
  'code': res.statusCode,
  'message':'OK'
}))

module.exports = router
