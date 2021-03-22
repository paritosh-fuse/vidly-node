const mongoose = require('mongoose');
const Joi = require('joi')

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            name:{
                type: String,
                required: true,
                min:5,
                max:50
            },
            isGold: {
                type: Boolean,
                default:false,
            },
            phone: {
                type: String,
                required: true,                
            }
        }),
        required:true,
    },
    movie : {
        type: new mongoose.Schema({
            title:{
                type:String,
                required:true,
                trim:true,
                min:5,
                max:255
            },
            dailyRentalRate:{
                type: Number,
                required:true,
                min: 0
            },
            dateOut:{
                type: Date,
                required: true,
                default: Date.now
            },
            dateReturned:{
                type: Date,
            }
        }),
        required: true
    }, 
    rentalFee:{
        type:Number,
        min:0
    }
}))

function validate(rental){
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    })

    return schema.validate(rental)
}

exports.Rental = Rental
exports.validate = validate