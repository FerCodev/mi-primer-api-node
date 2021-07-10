const { Schema, model} = require('mongoose')
const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean
})
//modelo con mongoose
const Note = model('Note', noteSchema)

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// Note.find({}).then(result => {
//   console.log(result)
//   mongoose.connection.close()
// })

// const note = new Note({
//   content: 'primera prueba de guardado en la bd',
//   date: new Date(),
//   important: true 
// })
// note.save()
//   .then(result => {
//     console.log(result)
//     mongoose.connection.close()
//   }).catch(err => {
//     console.error(err)
//   })


module.exports = Note