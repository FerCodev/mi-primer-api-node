require('dotenv').config()
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
  try {
    const users = await User.find().populate('events', {
      title:1,
      userId:1
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
}

const getUserById = async (req, res) => {
  const {userId} = req
  console.log(userId)
  const users = await User.findById(userId).populate('events',{
    title:1,
    userId:1
  })
  res.json(users)
}


module.exports = { 
  createUser,
  getAllUsers,
  getUserById
}
