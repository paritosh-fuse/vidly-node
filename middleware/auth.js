const jwt = require("jsonwebtoken")
const config = require('config');

const authenticate = (req, res, next) => {
    const excludedRoutes = ['/graphql']

    if (excludedRoutes.includes(req.path)) { 
        next() 
    } else {
        console.log('Authenticating...')
        const token = req.header('x-auth-token')
        if(!token) return res.status(401).send('Access Denied. No Token Provided.')
    
        try{
            const payLoad = jwt.verify(token, config.get('jwtKey'))
            req.user = payLoad;
            next()
        } catch(ex) {
            return res.status(400).send('Invalid Token.')
        }
    }

}

module.exports = authenticate;