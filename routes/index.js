const express = require('express')
const usersController = require('../controllers/usersController')
const eventsController = require('../controllers/eventsController')
const router = express.Router()

module.exports = function(){
  // RUTAS DE EVENTOS 
  router.get('/', eventsController.home)
  
  router.get('/api/events', eventsController.getAllEvents)
  
  router.get('/api/events/:id', eventsController.getEventById)
  
  // router.put('/api/events/:id', eventsController.putEventById)
  // //BORRA EVENTOS POR ID
  //router.delete('/api/events/:id', eventsController.deleteEventById)
  // //BORRA TODA LA COLECCION DE EVENTOS EN LA BD
  // router.delete('/api/events', eventsController.deleteAllEvents)
  
  //router.post('/api/events', eventsController.saveEvent)



  //  RUTAS DE USUARIO
  router.post('/api/users', usersController.createUser)

  router.get('/api/users', usersController.getAllUsers)
  return router
}
