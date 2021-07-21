require('dotenv').config()
//Primero importamos el modulo y luego hacemos la 
//llamada-- dejamos la version simplificada
//const connectDB = require('./mongo.js')
//connectDB()
require('./mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/Note')
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

app.get('/api/notes', async (req, res) => {
  // Note.find({}).then(notes => {
  //   res.json(notes)
  // })
  const notes = await Note.find({})
    res.json(notes)
})

app.get('/api/notes/:id', (req, res, next) => {
  const {id} = req.params
  //const note = notes.find((note) => note.id === id)

  Note.findById(id)
    .then( note => {
      if (note) {
        return res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))  
})

app.put('/api/notes/:id', (req, res, next) => {
  const {id} = req.params
  const note = req.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, {new: true} )
    .then(result => {
      res.json(result)
    })
    .catch(err => next(err))
})

app.delete('/api/notes/:id', (req, res, next) => {
  const {id} = req.params
  
  Note.findByIdAndRemove(id)
    .then( () => {res.status(204).end()})
    .catch( error => next(error))
})

app.post('/api/notes', async (req, res, next) => {
  const note = req.body
  if (!note.content) {
    return res.status(400).json( { error : 'note.content is missing' } )
  }

  const newNote = new Note({
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString(),
  })
  try {
    const savedNote = await newNote.save()
    res.json(savedNote)
  } catch (error) {
    next(error)
  }
  
  // newNote.save()
  //   .then(savedNote => {
  //     console.log(newNote)
  //     res.json(savedNote)
  //   })
  //   .catch(err => next(err))
})

app.use(() => {
  console.log('hola pepe')
})

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`)
})

module.exports = {app, server}