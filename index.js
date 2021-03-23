const express = require('express')
const app = express()
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

require('./startup/server')
require('./startup/logging')(app)
require('./startup/routes')(app)
require('./startup/config')()

port = process.env.PORT || 3001
app.listen(port, () => console.info(`Listening at port ${port}`))

// const debug = require('debug')('app');
// console.log(process.env.NODE_ENV) 
// console.log(app.get('env'))
// app.use(express.static('public'))
// app.use(helmet())

// Config
// debug(`Name: ${config.get('name')}`)
// debug(`ENV: ${app.get('env')}`)