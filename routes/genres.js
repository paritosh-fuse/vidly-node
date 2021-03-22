const express = require('express')
const router = express.Router()
const {Genre, validateSchema} = require('../models/genre')
const authorize = require('../middleware/admin')

router.get('/', async (req, res) => {        
    const genres = await Genre.find().sort('name')
    return res.send(genres)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const genre = await Genre.findById(id)
    if (!genre) return res.status(404).send('Genre not found!')
    res.send(genre)
})

router.post('/', async (req, res) => {
    const {name} = req.body
    let newGenre = new Genre({
        name
    })
    try {
        newGenre = await newGenre.save()
        res.send(newGenre)
    } catch(err) {
        res.send(err.message)
    }
})

router.put('/:id', async (req, res) => {
    const { error } = validateSchema(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
})

router.delete('/:id', authorize, async (req, res) => {
    const id = req.params.id

    const genre = await Genre.findByIdAndRemove(id)
    if (!genre) return res.status(404).send('Genre not found!')
    return res.send(genre)
})

module.exports = router;