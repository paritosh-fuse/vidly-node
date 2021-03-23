const config = require('config');

module.exports = function () {
    if (!config.get('jwtKey')){
        throw new Error("JWT Key not defined")
    }
}