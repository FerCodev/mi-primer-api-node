const express = require('express')
const cors = require('cors')
const app = express()
//const notes = require('./api/notes.json')
app.use(cors())
app.use(express.json())

// const logger = app.use((req, res, next) => {
//   console.log(req.method)
//   console.log(req.path)
//   console.log(req.body)
//   console.log('---------------------')
//   next()
// })
// app.use(logger)

let notes = [
  {
    id: 1,
    content: 'hola perro vegano',
    date: '2020-05-30T18:39.34.0912',
    important: false,
  },
  {
    id: 2,
    content: 'me gusta la pastafrola',
    date: '2020-05-30T18:39.34.0912',
    important: false,
  },
  {
    id: 3,
    content: 'hola mundo loco',
    date: '2020-05-30T18:39.34.0912',
    important: false,
  },
]



app.get('/', (req, res) => {
  res.send(`<h1>Hola mundo</h1>`)
})

app.get('/api/notes', (req, res) => {
  res.json(notes).end()
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
  notes = notes.filter((note) => note.id === id)
  res.status(204).end()
  //res.send(id)
  console.log(id)
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
