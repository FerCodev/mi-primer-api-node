const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authorization = req.get('authorization')
  let token = ''

  if(authorization && authorization.toLowerCase().startsWith('bearer')){
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if(!token || !decodedToken.id){
    return res.status(401).json({ error : 'token is missing or invelid'})
  }

  const { id: userId } = decodedToken 
  req.userId = userId
  //console.log(userId)

  next()
}