const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express')
const config = require('config')
const morgan = require('morgan')
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const auth = require('./routes/auth')

const mongoose = require('mongoose');
const app = express()
const authenticate = require('./middleware/auth');

app.use(morgan('tiny'))
app.use(authenticate);
if (!config.get('jwtKey')){
    console.error("JWT Key not defined");
    process.exit(1)
}

mongoose.connect('mongodb://localhost/vidly', {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true
})
  .then(() => console.log('Connected!'))
  .catch(err => console.log(err))


// Routes
app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/users', users)
app.use('/api/auth', auth)


port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening at port ${port}`))

// const debug = require('debug')('app');
// const helmet = require("helmet");
// console.log(process.env.NODE_ENV) 
// console.log(app.get('env'))
// app.use(express.static('public'))
// app.use(helmet())

// Config
// debug(`Name: ${config.get('name')}`)
// debug(`ENV: ${app.get('env')}`)