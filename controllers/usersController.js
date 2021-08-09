const User = require('../models/User')
//const Event =require('../models/Event')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
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
  } catch (error) {
    console.error(error)
    res.status(400).json(error._message)
  }
  
}
const getAllUsers = async (req, res) => {
  const users = await User.find().populate('events')
  res.json(users)
  console.log(users) 
  console.log(users._id)
}

const getUserById = async (req, res) => {
  const id = req.params.id
  const users = await User.findById(id).populate('events')
  console.log(users)
  res.json(users)
}
// {
//   title:1,
//   description:1,
//   imgUrl:1,
//   location:1,
//   highlight:1,
//   userId:1
// }

module.exports = { 
  createUser,
  getAllUsers,
  getUserById
}
