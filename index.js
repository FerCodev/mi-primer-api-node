'use strict'
require('dotenv').config()

//Primero importamos el modulo y luego hacemos la 
//llamada-- dejamos la version simplificada
//const connectDB = require('./mongo.js')
//connectDB()
require('./mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const Event = require('./models/Event')
const { request } = require('express')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
//const mongoose = require('mongoose')
const usersController = require('./controllers/usersController')
const User = require('./models/user')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send(`<h1>Hola mundo</h1>`)
})

app.get('/api/events', async (req, res) => {
  const events = await Event.find({}).populate('user',{
    username:1,
    name:1
  })
    res.json(events)
})

app.get('/api/events/:id', (req, res, next) => {
  const {id} = req.params
  //const event = events.find((event) => event.id === id)

  Event.findById(id)
    .then( event => {
      if (event) {
        return res.json(event)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))  
})

app.put('/api/events/:id', (req, res, next) => {
  const {id} = req.params
  const event = req.body

  const newEventInfo = {
    title : event.title
  }

  Event.findByIdAndUpdate(id, newEventInfo, {new: true} )
    .then(result => {
      res.json(result)
    })
    .catch(err => next(err))
})
//BORRA EVENTOS POR ID
app.delete('/api/events/:id', async (req, res, next) => {
  const {id} = req.params
  
  try {
    await Event.findByIdAndRemove(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
//BORRA TODA LA COLECCION DE EVENTOS EN LA BD
app.delete('/api/events', async (req, res, next) => {
  const eventos = req.body
  try {
    await Event.deleteMany(eventos)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.post('/api/events', async (req, res, next) => {
  const {
    title,
    description,
    imgUrl,
    location,
    highlight = false,
    userId  
  } = req.body
  const user = await User.findById(userId)
  console.log(user)
  
  if (!title) {
    return res.status(400).json( { error : 'event.title is missing' } )
  }
  //highlight: typeof highlight !== 'undefined' ? highlight : false
  const newEvent = new Event({
    title,
    highlight,
    date : new Date().toString(),
    description,
    imgUrl,
    location,
    user : user._id
  })
  try {
    const savedEvent = await newEvent.save()
    console.log(savedEvent)
    user.events = user.events.concat(savedEvent._id)
    await user.save()

    res.json(savedEvent)
  } catch (error) {
    console.error(error.name)
    next(error)
    //console.log(error.name)
  }
})

//app.use('/api/users', usersController.createUser)

app.use('/', routes())
app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`)
})

module.exports = {app, server}