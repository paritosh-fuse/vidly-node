const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => {
<<<<<<< HEAD
    const excludedRoutes = ['/graphql']
=======
    const excludedRoutes = ['/api/users', '/api/auth']
>>>>>>> 4af1eaf7e4ab101d3e8ff8ce79695beb653cb931

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
