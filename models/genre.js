const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength:5,
        maxLength: 50,
    }
})

const Genre = mongoose.model('Genre', genreSchema)

const genreJoi = Joi.object({
    name: Joi.string().required().min(3)
})
const validateSchema = (obj) => {
    return genreJoi.validate(obj)
}

exports.Genre = Genre;
exports.validateSchema = validateSchema;
exports.genreSchema = genreSchema;
