const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/User')
const {api, getUsers} = require('./helpers')
const { server } = require('../index')

describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10)
    const user = new User({ username: 'FerRoot', passwordHash })

    await user.save()
  })
  test('works as expected creating a fresh username', async () => {
    const usersAtStart = await getUsers()

    const newUser = {
      username: 'Fercode',
      name: 'fernando',
      password: 'falopitaremix'
    }
    // newUser.save()
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length +1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
    console.log(newUser.username)
  })
  test('creation fails with proper statuscode and if username is already taken', async () => {
    const usersAtStart = await getUsers()
    const username = usersAtStart.map(u => u.username)
    console.log(username)
    const newUser = {
      username: 'FerRoot',
      name: 'fernando',
      password: 'falopitaremix'
    }
    const result = await api  
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      expect(result.body.errors.username.message).toContain('Error, expected `username` to be unique')

      const usersAtEnd = await getUsers()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  afterAll(() => {
    mongoose.connection.close()
    server.close()
  })
})