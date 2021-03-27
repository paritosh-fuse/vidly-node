const express = require('express')
const app = express()
const helmet = require('helmet');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

app.use(helmet())
require('./startup/server')
require('./startup/logging')(app)
require('./startup/routes')(app)
require('./startup/config')()

const port = process.env.PORT || 3001
const server = app.listen(port, () => console.info(`Listening at port ${port}`))

module.exports = server

// const debug = require('debug')('app');
// console.log(process.env.NODE_ENV) 
// console.log(app.get('env'))
// app.use(express.static('public'))

// Config
// debug(`Name: ${config.get('name')}`)