const User = require('../models/user')
const bcrypt = require('bcrypt')

exports.createUser = async (req, res) => {
  try {
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
    res.status(201).json(savedUser)
  } catch (e) {
    res.status(400).json(e)
  }
  
}
'continuar revisando el error que me tira 201'
'debe haber una diferencia en alguna parte controlador'
'de usuarios o del test en si'