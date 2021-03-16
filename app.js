const config = require('config')
const debug = require('debug')('app');
const express = require('express')
const Joi = require('joi');
const morgan = require('morgan')
const helmet = require("helmet");
const auth = require('./auth');


const app = express()
// console.log(process.env.NODE_ENV) 
// console.log(app.get('env'))
// app.use(express.static('public'))

app.use(express.json())
app.use(auth)
app.use(helmet())
app.use(morgan('tiny'))

// Config
debug(`Name: ${config.get('name')}`)
debug(`ENV: ${app.get('env')}`)


const genreSchema = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(3).required()
})

const validateSchema = (obj) => {
    return genreSchema.validate(obj)
}

const genres = [
    {id: 1, name: "comedy"},
    {id: 2, name: "horror"},
    {id: 3, name: "sci-fi"},
    {id: 4, name: "thriller"},
]

app.get('/api/genres', (req, res) => {    
    return res.send(genres)
})

app.get('/api/genres/:id', (req, res) => {
    const id = req.params.id
    const genre = genres.find(gen => gen.id === parseInt(id))
    
    if (!genre) return res.status(404).send('Genre not found!')
    res.send(genre)
})

app.post('/api/genres/', (req, res) => {
    const {name} = req.body
    const newGenre = {
        id: genres.length + 1,
        name
    }
    const {error} = validateSchema(newGenre)

    if (error) return res.status(400).send(`${error.details[0].message}`)

    genres.push(newGenre)
    res.send(newGenre)
})

app.put('/api/genres/:id', (req, res) => {
    const {id} = req.params
    const {name} = req.body

    const index = genres.findIndex(gen => gen.id === parseInt(id))    
    if (index === -1) return res.status(404).send('Genre not found!')

    const updatedGenre = {
        id,
        name
    }
    const {error} = validateSchema(updatedGenre)
    if (error) return res.status(400).send(`${error.details[0].message}`)
    
    genres[index].name = name
    res.send(updatedGenre)

})

app.delete('/api/genres/:id', (req, res) => {
    const id = req.params.id

    const index = genres.findIndex(gen => gen.id === parseInt(id))    
    if (index === -1) return res.status(404).send('Genre not found!')
    
    const genre = genres[index]
    genres.splice(index, 1)

    return res.send(genre)
})

port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening at port ${port}`))
