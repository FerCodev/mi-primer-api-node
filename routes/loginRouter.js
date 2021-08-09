const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

loginRouter.post('/', async ( req, res ) => {
  // const { body } = req
  const { username, password } = req.body
  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    :await bcrypt.compare(password, user.passwordHash)

    if(!(user && passwordCorrect)){
      res.status(401).json({
        error: 'invalid user or password'
      })
    }
    const userForToken ={
      name : user.name,
      username : user.username,
      id : user._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60 * 24 * 7 
    })
    res.send({
      name : user.name,
      username : user.username,
      token
    })
    console.log(userForToken)
})
//const login = 
module.exports = loginRouter