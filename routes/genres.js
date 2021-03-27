const express = require('express')
const router = express.Router()
const {Genre, validateSchema} = require('../models/genre')
const authorize = require('../middleware/admin')
const validateObjID = require('../middleware/validateObjectID')

router.get('/', async (req, res) => {  
    const genres = await Genre.find().sort('name')
    return res.send(genres)
})

router.get('/:id', validateObjID, async (req, res) => {
    const id = req.params.id
    const genre = await Genre.findById(id)
    if (!genre) return res.status(404).send('Genre not found!')
    res.send(genre)
})

router.post('/', async (req, res) => {
    const { name } = req.body
    const { error } = validateSchema(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let newGenre = new Genre({
        name
    })
    newGenre = await newGenre.save()
    res.send(newGenre)
})

router.put('/:id', validateObjID, async (req, res) => {
    const { error } = validateSchema(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
})

router.delete('/:id', [authorize, validateObjID], async (req, res) => {
    const id = req.params.id

    const genre = await Genre.findByIdAndRemove(id)
    if (!genre) return res.status(404).send('Genre not found!')
    return res.send(genre)
})

module.exports = router;