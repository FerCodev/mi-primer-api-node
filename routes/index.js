const router = require('express').Router()

const usersController = require('../controllers/usersController')
const eventsController = require('../controllers/eventsController')
//const loginController = require('../controllers/loginController')
const userExtractor = require('../middleware/userExtractor')
const loginRouter = require('./loginRouter')

module.exports = function(){
  // RUTAS DE EVENTOS 
  router.get('/', eventsController.home)
  
  router.get('/api/events', eventsController.getAllEvents)
  
  router.get('/api/events/:id', eventsController.getEventById)
  
  router.put('/api/events/:id',userExtractor, eventsController.updatedEventById)

  router.patch('/api/events/:id',userExtractor, eventsController.patchEventById)
  
  router.delete('/api/events/:id',userExtractor, eventsController.deleteEventByID )

  router.delete('/api/events',userExtractor, eventsController.deleteAllEvents)

  router.post('/api/events',userExtractor, eventsController.saveEvent)
  //  RUTAS DE USUARIO
  router.post('/api/users', usersController.createUser)
  
  router.get('/api/users', usersController.getAllUsers)
  
  router.get('/api/users/:id', usersController.getUserById)
  // LOGIN ROUTES
  router.use('/api/login', loginRouter)
  
  return router;
}
