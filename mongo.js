const mongoose = require('mongoose')
const {Schema, model} = mongoose

const conectionString = process.env.MONGO_DB_URI
//conexion a mongop db
mongoose.connect(conectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('database connected')
  }).catch( err => {
    console.error(err)
  })







