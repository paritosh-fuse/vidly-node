const express = require('express')
const router = express.Router()
const {Movie} = require('../models/movie')
const {Customer} = require('../models/customer')
const {Rental, validate} = require('../models/rental')
const Fawn = require('fawn')
const mongoose = require('mongoose')
const authorize = require('../middleware/admin')
const validateObjID = require('../middleware/validateObjectID');

Fawn.init(mongoose)

router.get('/', async (req, res) => {        
    const rentals = await Rental.find().sort('-dateOut')
    return res.send(rentals)
})

router.get('/:id', validateObjID, async (req, res) => {        
    const {id} = req.params
    const rental = await Rental.findById(id)

    if (!rental) return res.status(404).send('Rental Entry not Found')
    return res.send(rental)
})

router.post('/', async (req, res) => {        
    const {customerId, movieId} = req.body
    
    const {error} = validate({customerId, movieId})
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(customerId)
    if(!customer) return res.status(404).send('Customer Not Found!')

    const movie = await Movie.findById(movieId)
    if(!movie) return res.status(404).send('Movie Not Found!')

    if ( movie.numberInStock === 0 ) return res.status(400).send('Movie Out of Stock')

    let rental = new Rental({
        customer:{
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie:{
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        }
    })
    
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', {_id: movie._id}, {
                $inc:{ numberInStock: -1 }
            }).run()
        res.send(rental)
    } catch(err) {
        res.status(500).send('Transaction Failed')
    }
})


router.put('/:id', validateObjID, async (req, res) => {    
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const {id} = req.params        
    const {customerId, movieId} = req.body
    const {error} = validate({customerId, movieId})
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(customerId)
    if(!customer) return res.status(404).send('Customer Not Found!')

    const movie = await Movie.findById(movieId)
    if(!movie) return res.status(404).send('Movie Not Found!')
    
    const rental = await Rental.findByIdAndUpdate(id)
    if (!rental) return res.status(404).send('Rental Entry not Found')

    const daysRented = Math.ceil((Date.now() - rental.movie.dateOut)/_MS_PER_DAY)
    const updatedRental = {
        customer:{
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie:{
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
            dateOut: rental.dateOut,
            dateReturned: Date.now()            
        },
        rentalFee: daysRented * movie.dailyRentalRate
    }

    const result = await Rental.updateOne({_id: id}, updatedRental, {new: true})

    res.send(updatedRental)

})

router.delete('/:id', [authorize, validateObjID], async (req, res) => {        
    const {id} = req.params
    const rental = await Rental.findByIdAndRemove(id)
    if (!rental) return res.status(404).send('Rental Entry not Found')
    res.send(rental)
})



module.exports = router