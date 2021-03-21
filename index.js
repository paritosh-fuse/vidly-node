const express = require('express')
const config = require('config')
const debug = require('debug')('app');
const morgan = require('morgan')
const helmet = require("helmet");
const auth = require('./middleware/auth');
const genres = require('./routes/genres')

const app = express()
// console.log(process.env.NODE_ENV) 
// console.log(app.get('env'))
// app.use(express.static('public'))

app.use(express.json())
app.use(auth)
app.use(helmet())
app.use(morgan('tiny'))

// Routes
app.use('/api/genres', genres)

// Config
debug(`Name: ${config.get('name')}`)
debug(`ENV: ${app.get('env')}`)


port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening at port ${port}`))
