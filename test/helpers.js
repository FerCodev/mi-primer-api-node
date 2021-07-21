const { app } = require('../index')

const supertest = require('supertest')

const api = supertest(app)

const initialNotes = [ 
  {
    content: 'aprendiendo full stack',
    important: true,
    date: new Date()
  },
  {
    content: 'me gustan los fideitos',
    important: true,
    date: new Date()
  }
]
const getAllContentsFromNotes = async () => { 
  const response = await api.get('/api/notes')
  return {
    contents: response.body.map(note => note.content),
    response
  }
}


module.exports = {
  api,
  initialNotes,
  getAllContentsFromNotes
}