'use strict'

const express = require('express')
const validate = require('express-validation')
const paramValidation = require('../../config/validations').auth
const authController = require('../controllers/auth.controller')
// const middlewares = require('../helpers/middlewares')
