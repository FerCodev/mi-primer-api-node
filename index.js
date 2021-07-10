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
//const notes = require('./api/notes.json')
//const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

let notes = []



app.get('/', (req, res) => {
  res.send(`<h1>Hola mundo</h1>`)
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find((note) => note.id === id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.filter((note) => note.id === id)

  if(note){
    res.status(204).end()
    //res.send(id)
    console.log(id)
  }else{
    console.log('puto')
  }
  
})

app.post('/api/notes', (req, res) => {
  const note = req.body
  if (!note || !note.content) {
    return res.status(400).json( { error : 'note.content is missing' } )
  }

  const id = notes.map((note) => note.id)
  const maxId = Math.max(...id)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString(),
  }
  notes = [...notes, newNote]

  console.log(newNote)
  res.status(201).json(newNote)
})

app.use(() => {
  console.log('hola pepe')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`)
})
