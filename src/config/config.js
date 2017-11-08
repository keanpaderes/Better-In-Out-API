'use strict'

const Joi = require('joi')

require('dotenv').config()

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development','production','test'])
    .default('development'),
  JWT_SECRET: Joi.string()
    .required()
    .description('JWT Secret required'),
  PORT: Joi.number()
    .default(1337)
}).unknown()
  .required()

const { error, value: envVars} = Joi.validate(process.env, envVarsSchema)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
  env: envVars.NODE_ENV,
  jwtSecret: envVars.JWT_SECRET,
  port: envVars.PORT
}
