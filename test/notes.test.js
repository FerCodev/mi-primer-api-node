const mongoose = require('mongoose')

const { server } = require('../index')
const {
  api,
  initialNotes,
  getAllContentsFromNotes} = require('./helpers')

const Note = require('../models/Note')

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
test('there are two notes', async () =>{
  const respose = await api.get('/api/notes')
  expect(respose.body).toHaveLength(initialNotes.length)
})
test('the first note is about fernando', async () => {
  const response = await api.get('/api/notes')
  const contents = response.body.map(note => note.content)
  expect(contents).toContain('aprendiendo full stack')
})
test('valid note can be added', async () => {
  const newNote = {
    content: 'Proximamente async/await',
    important: true
  }
  await api 
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    //const response = await api.get('/api/notes')
    const {contents, response} = await getAllContentsFromNotes()
    console.log('holaloco')

    expect(response.body).toHaveLength(initialNotes.length +1)
    expect(contents).toContain(newNote.content)
})
test('note without content is not added', async () => {
  const newNote = {
    important: true
  }
  await api 
    .post('/api/notes')
    .send(newNote)
    .expect(400)


    const response = await api.get('/api/notes')

    // const contents = response.body.map(note => note.content)

    expect(response.body).toHaveLength(initialNotes.length)
    //expect(contents).toContain(newNote.content)
})

test('a note can be delete', async () => {
  const {response: firstResponse} = await getAllContentsFromNotes()
  //const firstResponse = response
  const { body: notes } = firstResponse
  const noteToDelete = notes[0]
  
  
  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

    const { contents, response: secondResponse } = await getAllContentsFromNotes()
    //const secondResponse = response
    console.log(secondResponse.body.length)
    expect(response.body).toHaveLength(initialNotes.length-1)

    expect(contents).not.toContain(noteToDelete.content)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
