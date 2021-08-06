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
  const users = await User.find().populate('event', {
    title:1,
    description:1,
    imgUrl:1,
    location:1,
    highlight:1,
    userId:1
  })
  res.json(users)
}

const getUserById = async (req, res) => {
  const id = req.params.id
  console.log(id)

  const users = await User.findById(id).populate('event',{title : 1})
  console.log(users)
  res.json(users)
}

// const saveEvent =  async (req, res, next) => {
//   const event = req.body
//   const {
//     title,
//     description,
//     imgUrl,
//     location,
//     highlight = false,
//     userId  
//   } = req.body
//   const user = await User.findById(userId)
  
//   if (!title) {
//     return res.status(400).json( { error : 'event.title is missing' } )
//   }
//   //highlight: typeof highlight !== 'undefined' ? highlight : false
//   const newEvent = new Event({
//     title,
//     highlight,
//     dates : { 
//       date : event.dates.date,
//       price: event.dates.price
//     },
//     description,
//     imgUrl,
//     location,
//     user : user._id
//   })
//   try {
//     const savedEvent = await newEvent.save()
//     // console.log(savedEvent)
//     userEvents = user.events.concat(savedEvent._id)
//     //await user.update()
//     await user.save()

//     res.json(savedEvent)
//   } catch (error) {
//     // console.error(error.name)
//     next(error)
//   }
// }

module.exports = { 
  createUser,
  getAllUsers,
  // saveEvent,
  getUserById
  //userLogin,
}
