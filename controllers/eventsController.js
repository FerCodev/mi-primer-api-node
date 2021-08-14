require('dotenv').config()
const User = require('../models/User')
const Event = require('../models/Event')

const home =  (req, res) => {
  res.send(`<h1>Hola mundo</h1>`)
}
const getAllEvents = async (req, res) => {
  const events = await Event.find({}).populate('user',{
    username : 1
  })
  return res.json(events)
}
const getEventById = async (req, res, next) => {
  const id = req.params.id
  console.log(id)
  try {
    const event = await Event.findById(id).populate('user', {
      username:1
    })
    if(event) {
      res.json(event)
      console.log(event)
    }else{
      res.json('el evento no existe')
      console.log('el evento no existe')
      return 
    }
  } catch (error) {
    next(error)
  }
  
}
const deleteAllEvents = async (req, res, next) => {
  const eventos = req.body
  try {
    await Event.deleteMany(eventos)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
const deleteEventByID = async (req, res, next) => {
  const id = req.params.id
  try {
    const event = await Event.findById(id)
    const user = await User.findById(event.user)
    const events= user.events
    const eventIndex = events.indexOf(id)
    if(eventIndex > -1){
      await events.splice(eventIndex, 1)
      console.log(events)
    }
    await user.save()

    const eventToDelete = await Event.findByIdAndRemove(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
const updatedEventById = async (req, res, next) => {
  const {id} = req.params
  const event = req.body
  console.log(event)
  const newEventInfo = {
    title      : event.title,
    highlight  : event.highlight,
    date       : new Date().toString(),
    description: event.description,
    imgUrl     : event.imgUrl,
    location   : event.location,
  }
  try { 
    const updatedEvent = await Event.findByIdAndUpdate(id, newEventInfo, {new: true} )
    res.json(updatedEvent)
  } catch (error) {
    next(error)
  }
}

const patchEventById = async (req, res, next) => {
  const {id} = req.params
  const event = req.body
  console.log(event)
  const newEventInfo = {
    title      : event.title,
    highlight  : event.highlight,
    description: event.description,
    imgUrl     : event.imgUrl,
    location   : event.location,
  }
  try { 
    const updatedEvent = await Event.findByIdAndUpdate(id, newEventInfo, {new: true} )
    res.json(updatedEvent)
  } catch (error) {
    next(error)
  }
}
const saveEvent =  async (req, res, next) => {
  const event = req.body
  const {
    title,
    description,
    imgUrl,
    location,
    highlight = false,
    } = req.body
  // SACAR USERID DE REQUEST 
  const { userId } = req

  const user = await User.findById(userId)
  
  if (!title) {
    return res.status(400).json( { error : 'event.title is missing' } )
  }

  const newEvent = new Event({
    title,
    highlight,
    dates : { 
      date : event.dates.date,
      price: event.dates.price
    },
    description,
    imgUrl,
    location,
    user : userId
  })
  try {
    const savedEvent = await newEvent.save()
    
    const userEvents = await user.events.push(savedEvent._id)

    console.log(user.events)

    await user.save()
    console.log(user)
    
    res.json(savedEvent)
  } catch (error) {
    // console.error(error.name)
    next(error)
  }
}


module.exports = {
  home,
  getAllEvents,
  getEventById,
  deleteAllEvents,
  deleteEventByID,
  updatedEventById,
  patchEventById,
  saveEvent
}