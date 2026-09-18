 //importar mi aplicacion
 const app= require ("./app")

 //verificar puerto de las variables de entorno
 const PUERTO = process.env.PUERTO||3333
 
 //imprimo por consola el link de servidor 
 app.listen(PUERTO, ()=>{
    console.log(`mi servidor: http://localhost:${PUERTO}`)

 })