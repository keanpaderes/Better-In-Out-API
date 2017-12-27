'use strict'

const Joi = require('joi')

require('dotenv').config()

const envVarsSchema = Joi.object({
  API_URL: Joi.string()
    .required()
    .description('API url required'),
  GOOGLE_CLIENT_ID_ANDROID: Joi.string()
    .required()
    .description('Google Client ID for Android required'),
  GOOGLE_CLIENT_ID_WEB: Joi.string()
    .required()
    .description('Google Client ID for Web required'),
  JWT_SECRET: Joi.string()
    .required()
    .description('JWT Secret required'),
  MONGODB_AUTH: Joi.string()
    .required()
    .description('Mongodb authentication database required'),
  MONGODB_PORT: Joi.number()
    .default(27017),
  MONGODB_PW: Joi.string()
    .required()
    .description('Mongodb password required'),
  MONGODB_USER: Joi.string()
    .required()
    .description('Mongodb user required'),
  NODE_ENV: Joi.string()
  .allow(['development','production','test'])
  .default('development'),
  PORT: Joi.number()
  .default(1337)
}).unknown()
  .required()

const { error, value: envVars} = Joi.validate(process.env, envVarsSchema)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
  apiUrl: envVars.API_URL,
  clientId: {
    android: envVars.GOOGLE_CLIENT_ID_ANDROID,
    web: envVars.GOOGLE_CLIENT_ID_WEB
  },
  env: envVars.NODE_ENV,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    auth: envVars.MONGODB_AUTHDB,
    password: envVars.MONGODB_PW,
    port: envVars.MONGO_PORT,
    user: envVars.MONGODB_USER
  },
  port: envVars.PORT
}
