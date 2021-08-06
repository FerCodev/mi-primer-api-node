const router = require('express').Router()

const usersController = require('../controllers/usersController')
const eventsController = require('../controllers/eventsController')
//const loginController = require('../controllers/loginController')
const loginRouter = require('./loginRouter')

module.exports = function(){
  // RUTAS DE EVENTOS 
  router.get('/', eventsController.home)
  
  router.get('/api/events', eventsController.getAllEvents)
  
  router.get('/api/events/:id', eventsController.getEventById)
  
  router.put('/api/events/:id', eventsController.updatedEventById)

  router.patch('/api/events/:id', eventsController.patchEventById)
  
  
  // //BORRA EVENTOS POR ID
  //router.delete('/api/events/:id', eventsController.deleteEventById)
  // //BORRA TODA LA COLECCION DE EVENTOS EN LA BD
  // router.delete('/api/events', eventsController.deleteAllEvents)
  //router.use('/api/events', eventsController.saveEvent)
  //  RUTAS DE USUARIO
  router.post('/api/users', usersController.createUser)
  
  router.get('/api/users', usersController.getAllUsers)
  
  router.get('/api/users/:id', usersController.getUserById)
  // LOGIN ROUTES
  router.use('/api/login', loginRouter)
  
  return router;
}
//module.exports = router
