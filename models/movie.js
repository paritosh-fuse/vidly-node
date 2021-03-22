const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre')

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim:true,
        minLength:3,
        maxLength: 255,
    },
    numberInStock: {
        type: Number,
        required:true,
        min:0
    },
    dailyRentalRate: {
        type: Number,
        required:true,
        min:0
    },
    genre: {
        type: genreSchema,
        required: true,
    },
})

const Movie = mongoose.model('Movie', movieSchema)

const movieJoi = Joi.object({
    title: Joi.string().min(3).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),    
})
const validateSchema = (obj) => {
    return movieJoi.validate(obj)
}

exports.Movie = Movie;
exports.validateSchema = validateSchema;