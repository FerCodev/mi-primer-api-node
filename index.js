require('dotenv').config()

//Primero importamos el modulo y luego hacemos la 
//llamada-- dejamos la version simplificada
//const connectDB = require('./mongo.js')
//connectDB()
require('./mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes/index')
const { request } = require('express')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
//const loginController = require('./controllers/loginController')
//const loginRouter = require('./routes/loginRouter')
const usersController = require('./controllers/usersController')
const eventsController = require('./controllers/eventsController')
//const User = require('./models/User')

app.use(cors())
app.use(express.json())

//BORRA EVENTOS POR ID
app.delete('/api/events/:id', eventsController.deleteEventByID )
//BORRA TODA LA COLECCION DE EVENTOS EN LA BD
app.delete('/api/events', eventsController.deleteAllEvents)
app.post('/api/events', eventsController.saveEvent)
//app.use('/api/login', loginRouter) SI FUNCIONA BIEN EN ROUTES, BORRAR

app.use('/', routes())
app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`)
})

module.exports = {app, server}