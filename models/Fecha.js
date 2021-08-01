const { Schema, model} = require('mongoose')
const fechaSchema = new Schema({
  type       : Date,
  time       : {
    type     : Number,
    required : [true, 'tenes que ingresar un horario man']
  },
  price      : {
    type     : Number,
    required : [true, 'Decime cuanto sale loco']
  }
})
//modelo con mongoose
const Fecha = model('Fecha', fechaSchema)

fechaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = Fecha