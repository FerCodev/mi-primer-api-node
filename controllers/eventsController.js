const Event = require('../models/Event')
// const User = require('../models/User')
const mongoose = require('mongoose')

const home =  (req, res) => {
  res.send(`<h1>Hola mundo</h1>`)
}
const getAllEvents = async (req, res) => {
  const events = await Event.find({}).populate('user',{
    username:1,
    name:1
  })
    res.json(events)
}
const getEventById = (req, res, next) => {
  const {id} = req.params
  //const event = events.find((event) => event.id === id)

  Event.findById(id)
    .then( event => {
      if (event) {
        return res.json(event)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))  
}
// const deleteAllEvents = async (req, res, next) => {
//   const eventos = req.body
//   try {
//     await Event.deleteMany(eventos)
//     res.status(204).end()
//   } catch (error) {
//     next(error)
//   }
// }
// const deleteEventByID = async (req, res, next) => {
//   const {id} = req.params
  
//   try {
//     await Event.findByIdAndRemove(id)
//     res.status(204).end()
//   } catch (error) {
//     next(error)
//   }
// }
// const saveEvent =  async (req, res, next) => {
//   const {
//     title,
//     description,
//     imgUrl,
//     location,
//     highlight = false,
//     userId  
//   } = req
//   const user = await User.findById(userId)
//   console.log(user)
  
//   if (!title) {
//     return res.status(400).json( { error : 'event.title is missing' } )
//   }
//   //highlight: typeof highlight !== 'undefined' ? highlight : false
//   const newEvent = new Event({
//     title,
//     highlight,
//     date : new Date().toString(),
//     description,
//     imgUrl,
//     location,
//     user : user._id
//   })
//   try {
//     const savedEvent = await newEvent.save()
//     console.log(savedEvent)
//     user.events = user.events.concat(savedEvent._id)
//     await user.save()

//     res.json(savedEvent)
//   } catch (error) {
//     console.error(error.name)
//     next(error)
//     //console.log(error.name)
//   }
// }

module.exports = {
  home,
  getAllEvents,
  getEventById
//   deleteAllEvents,
//   deleteEventByID
 }