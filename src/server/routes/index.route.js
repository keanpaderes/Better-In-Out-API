'use strict'

const express = require('express')
const GoogleAuth = require('google-auth-library')
const path = require('path')
const config = require('../../config/config')
const authRoutes = require('./auth.route')
const auth = new GoogleAuth()
const client = new auth.OAuth2(config.clientId.android)

const router = express.Router() // eslint-disable-line new-cap

/**
 * @swagger
 * /health-check:
 *   get:
 *     summary: Health check route for the server
 *     security: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A JSON object of the status code and a status message
 *         schema:
 *           properties:
 *             code:
 *               type: integer
 *               example: "200"
 *             message:
 *               type: string
 *               example: "OK"
 */
router.get('/health-check', (req, res) =>res.json({
  'code': res.statusCode,
  'message':'OK'
}))

router.post('/check', (req, res) => {
  client.verifyIdToken(req.body.token,
      Object.values(config.clientId), (e, login) => {
        if(e) res.status(500).send('Oh noes')
        else {
          const payload = login.getPayload()
          res.json({payload})
        }
      // var payload = login.getPayload();
      // var userid = payload['sub'];
      // // If request specified a G Suite domain:
      // //var domain = payload['hd'];
    })

})

// Mount routes here
// router.use('/auth', authRoutes)
router.use('/', express.static(path.join(__dirname, '../../assets/html')))

module.exports = router
