const ERROR_HANDLERS = {
  CastError: res =>
    res.status(400).send({ error: 'id used is malformed' }),

  ValidationError: ( res, {message} ) => 
    res.status(409).send( { error: message } ),

  JsonWebTokenError: res =>
    res.status(401).json({ error: 'token missin or invalid' }),
  
  TokenExpirerError: res => res.status(401).json({ error : 'token expired' }),

  defaultError: res => res.status(500).end()
}

module.exports = (error, req, res, next) => {
  console.error(error.name)
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

  handler(res, error)
  
  // console.error(error)
  // //console.log(error.name)
  // if(error.name === 'CastError'){
  //   res.status(400).end()
  // }else{
  //   res.status(500).end()
  // }
}