const { Schema, model} = require('mongoose')
const Fecha = require('./Fecha')
const eventSchema = new Schema({
  title       : {
    type      : String,
    maxlength : [50, 'El titulo no debe exceder los 50 caracteres'],
    minlength : [4, 'El titulo debe contener al menos 4 caracteres'] 
  },
    description : {
    type        : String, 
    required    : [ true, 'La descripcion del evento es necesaria' ],
    //maxlength : [ 480, 'La descripcion no debe exceder los 200 caracteres' ],
    //minlength : [ 12, 'la descripcion debe contener 12 o más caracteres' ]
  },
  date       : {
    type     : Date,
    required : false
  },
  highlight  : Boolean,
  location   : { 
    type: String,
  //  required: true
  },
  image       : {
    type      : String,
    required  : false,
    default   : ''
  },
})
//modelo con mongoose
const Event = model('Event', eventSchema)

eventSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = Event