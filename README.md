# mi-primer-api-node
el proyecto se encuentra desplegado en [api-node-Heroku](https://api-eventos-pilis.herokuapp.com/)
cuenta con los siguientes ENDPOINTS
# get api/user (trae todos los usuarios):
no requiere ningun tipo de autenticacion devuelve un objeto {username, name, id} por cada usuario
# post api/user (crea un usuario):
requiere de forma obligatoria los campos de username y password
# get api/user/:id (trae un usuario por id desde la base de datos):
no require ningun tipo de informacion y devuelve un objeto {username, name, id}
# post api/login (loguea un usuaio):
requiere de forma obligatoria los campos username y password. Devuelve un objeto {username, name, token}
