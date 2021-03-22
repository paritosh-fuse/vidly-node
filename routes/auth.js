const express = require('express')
const router = express.Router()
const {User} = require('../models/user')
const _ = require('lodash')
const bcrypt = require('bcrypt');
const Joi = require('joi')


const validate = (obj) => {
    const userJoi = Joi.object({
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return userJoi.validate(obj)
}

router.post('/',async (req, res) => {
    const body = req.body
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    const user = await User.findOne({email:body.email})
    if(!user) return res.status(400).send('Invalid email or password.')
    
    const isValid = await bcrypt.compare(body.password, user.password)
    if (!isValid) return res.status(400).send('Invalid email or password.')

    const token = user.generateAuthToken()
    res.send(token)
})

module.exports = router