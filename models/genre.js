const Joi = require('joi');
const mongoose = require('mongoose');
const { composeWithMongoose } = require('graphql-compose-mongoose')
const genreSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength:5,
        maxLength: 50,
        unique:true
    }
})

const Genre = mongoose.model('Genre', genreSchema)

const genreJoi = Joi.object({
    name: Joi.string().min(5).max(50).required()
})
const validateSchema = (obj) => {
    return genreJoi.validate(obj)
}

const GenreTC = composeWithMongoose(Genre)

module.exports = {
    Genre: Genre,
    GenreTC: GenreTC,
    validateSchema: validateSchema,
    genreSchema: genreSchema
}