const express = require('express')
const router = express.Router()
const {Movie, validateSchema} = require('../models/movie')
const {Genre} = require('../models/genre')
const authorize = require('../middleware/admin')
const validateObjID = require('../middleware/validateObjectID');

router.get('/', async (req, res) => {        
    const movies = await Movie.find().sort('name')
    return res.send(movies)
})


router.post('/', async (req, res) => {        
    const body = req.body

    const {error} = validateSchema(body)
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(body.genreId)
    if(!genre) return res.status(404).send('Genre not Found')

    let movie = new Movie({
        title: body.title,
        genre: {
            _id : genre._id,
            name: genre.name
        },
        dailyRentalRate: body.dailyRentalRate,
        numberInStock: body.numberInStock        
    })

    movie = await movie.save()
    res.send(movie)
})

router.get('/:id', validateObjID, async (req, res) => {        
    const {id} = req.params
    const movie = await Movie.findById(id)

    if (!movie) return res.status(404).send('Movie not Found')
    return res.send(movie)
})

router.put('/:id', validateObjID, async (req, res) => {    
    const {id} = req.params
    const body = req.body
    
    const {error} = validateSchema(body)
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(body.genreId)
    if(!genre) return res.status(404).send('Genre not Found')

    let updatedMovie = {
        title: body.title,
        genre: {
            _id : genre._id,
            name: genre.name
        },
        dailyRentalRate: body.dailyRentalRate,
        numberInStock: body.numberInStock        
    }

    const movie = await Movie.findByIdAndUpdate(id, updatedMovie, {new:true})
    if (!movie) return res.status(404).send('Movie not Found')    

    res.send(movie)
})

router.delete('/:id', [validateObjID, authorize], async (req, res) => {        
    const {id} = req.params
    const movie = await Movie.findByIdAndRemove(id)
    if (!movie) return res.status(404).send('Movie not Found')
    res.send(movie)
})



module.exports = router