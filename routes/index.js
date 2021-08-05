const express = require('express')
const usersController = require('../controllers/usersController')
const router = express.Router()

module.exports = function(){
  router.post('/api/users', usersController.createUser)

  router.get('/api/users', usersController.getAllUsers)
  return router
}
