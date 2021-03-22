const Joi = require('joi');
const mongoose = require('mongoose');


const Customer = mongoose.model('Customer', new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength:5,
        maxLength: 50,
    },
    phone: {
        type: Number,
        required:true
    },
    isGold: {
        type:Boolean,
        default:false
    }
}))

const customerJoi = Joi.object({
    name: Joi.string().required().min(5).max(50),
    phone: Joi.string().length(10),
    isGold: Joi.bool()
})
const validateSchema = (obj) => {
    return customerJoi.validate(obj)
}

exports.Customer = Customer;
exports.validate = validateSchema