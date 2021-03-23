require('winston-mongodb')
const winston = require('winston');
const config = require('config');
require('express-async-errors')
const morgan = require('morgan')

module.exports = function (app) {
    app.use(morgan('tiny'))

    const MONGODB_URI = config.get('MONGODB_URI')
    const opts = { useNewUrlParser: true, useUnifiedTopology: true };
    
    winston.add(new winston.transports.File({filename: './logs/logfile.log', level:'info'}))  
    winston.add(new winston.transports.MongoDB({db : MONGODB_URI, options: opts, level:'info'}))

    process.on('uncaughtException', (ex) => {
        console.log(ex.message, " | In Logging")
        winston.error(ex.message, {meta: ex})
        process.exit(1)
    })
    process.on('unhandledRejection', (ex) => {throw ex})
    
}
