const { app } = require('../index')
const supertest = require('supertest')
const User = require('../models/User')

const api = supertest(app)

const initialEvents = [ 
  {
    title: 'aprendiendo full stack',
    highlight: true,
    date: new Date()
  },
  {
    title: 'me gustan los fideitos',
    highlight: true,
    date: new Date()
  }
]
const getAllContentsFromEvents = async () => { 
  const response = await api.get('/api/notes')
  return {
    titles: response.body.map(event => event.title),
    response
  }
}

const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map(user => user.toJSON())
}


module.exports = {
  api,
  initialEvents,
  getAllContentsFromEvents,
  getUsers
}