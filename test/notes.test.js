const mongoose = require('mongoose')
const supertest = require('supertest')
const {app, server} = require('../index')

const Note = require('../models/Note')
const api = supertest(app)

const initialNotes = [ 
  {
    content: 'me gusta comer papa',
    important: true,
    date: new Date()
  },
  {
    content: 'me gustan los fideitos',
    important: true,
    date: new Date()
  }
]
beforeEach( async () => {
  await Note.deleteMany({})

  const note1 = new Note(initialNotes[0])
  await note1.save()

  const note2 = new Note(initialNotes[1])
  await note2.save()

})

test('notes are returned as JASON', async () =>{
  await api
          .get('/api/notes')
          .expect(200)
          .expect('content-Type', /application\/json/)
})
test('notes are returned as JASON', async () =>{
  const respose = await api.get('/api/notes')
  expect(respose.body).toHaveLength(2)
})



afterAll(() => {
  mongoose.connection.close()
  server.close()
})
