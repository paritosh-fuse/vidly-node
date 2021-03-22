const express = require('express')
const router = express.Router()
const {User, validate} = require('../models/user')
const _ = require('lodash')
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const body = req.body
    const {error} = validate(req.body)

    if(error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({email:body.email})
    if(user) return res.status(400).send('User already Registered.')

    const newUser = new User({
        name: body.name,
        email:body.email,
        password:body.password
    })

    const salt = await bcrypt.genSalt(12)
    newUser.password = await bcrypt.hash(newUser.password, salt) 
    await newUser.save()
    
    const token = user.generateAuthToken()
    res.header('x-auth-token',token).send(_.pick(newUser, ['_id', 'name', 'email']))
})

module.exports = router