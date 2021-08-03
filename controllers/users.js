const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (req, res) => {
  const {body} = req
  const {username, name, password} = body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })
  const savedUser = await user.save()
    res.json(savedUser)
  // const savedUser = await user.save()
  // res.json(savedUser)
})


module.exports = usersRouter