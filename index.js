require('dotenv').config()
//Primero importamos el modulo y luego hacemos la 
//llamada-- dejamos la version simplificada
//const connectDB = require('./mongo.js')
//connectDB()
require('./mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const Event = require('./models/Event')
const Fecha = require('./models/Fecha')
const { request } = require('express')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
//const notes = require('./api/notes.json')
//const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send(`<h1>Hola mundo</h1>`)
})

app.get('/api/events', async (req, res) => {
  // Event.find({}).then(events => {
  //   res.json(events)
  // })
  const events = await Event.find({})
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

// app.put('/api/events/:id', (req, res, next) => {
//   const {id} = req.params
//   const event = req.body

//   const newEventInfo = {
//     content: note.content,
//     important: note.important
//   }

//   Event.findByIdAndUpdate(id, newEventInfo, {new: true} )
//     .then(result => {
//       res.json(result)
//     })
//     .catch(err => next(err))
// })

app.delete('/api/events/:id', async (req, res, next) => {
  const {id} = req.params
  
  try {
    await Event.findByIdAndRemove(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.post('/api/events', async (req, res, next) => {
  const event = req.body
  if (!event.title) {
    return res.status(400).json( { error : 'note.title is missing' } )
  }

  const newEvent = new Event({
    title      : event.title,
    highlight  : typeof event.highlight !== 'undefined' ? event.highlight : false,
    date       : new Date().toISOString(),
    description: event.description,
    location   : event.location
  })
  try {
    const savedEvent = await newEvent.save()
    res.json(savedEvent)
  } catch (error) {
    next(error)
  }
})

// app.use(() => {
//   console.log('hola pepe')
// })

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`)
})

module.exports = {app, server}