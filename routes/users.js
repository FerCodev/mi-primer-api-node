const express = require('express')
const usersController = require('../controllers/usersController')
const router = express.Router()

module.exports = function(){
  router.post('/', usersController.createUser)

  return router
}
