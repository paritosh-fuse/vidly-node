const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength:5,
        maxLength: 50,
    },
    email: {
        type: String,
        required:true,
        unique: true,
        // match: /[a-z,0-9].*@.*[a-z,0-9].com$/i,
        minLength:5,
        maxLength: 255,
    },
    password: {
        type:String,
        required:true,
        unique:true,
        minLength:5,
        maxLength: 1024,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function() {    
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin }, config.get('jwtKey'))
}

const User = mongoose.model('User', userSchema)

const validateSchema = (obj) => {
    const userJoi = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return userJoi.validate(obj)
}

exports.User = User;
exports.validate = validateSchema