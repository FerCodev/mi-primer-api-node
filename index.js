require('dotenv').config()

require('./mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes/index')
const { request } = require('express')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')


{
  
  'ESTA FALLANDO LA CONECXION DE LOS MODELOS DE EVENT Y USER'
  'LA FALLA SE DETECTO POR PRIMERA VEZ LUEGO DE IMPLEMENTAR '
  'LOS CAMBIOS EN EL PROCESO DE CREACION DE UN EVENTO, BORRADO Y ACTUALIZADO DE LOS MISMOS '
  'CREO QUE EL ERROR SE DEBE A QUE HUBO UN CAMBIO EN LA FORMA DE OBTENER LA ID'
  'DEL USUARIO'

}



app.use(cors())
app.use(express.json())

app.use('/', routes())
app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`)
})

module.exports = {app, server}