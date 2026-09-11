const jsonwebtoken = require ("jsonwebtoken")
const autenticacion = (req, res, next) =>{
    //requerir o capturar 
    const token = req.header("autenticar")?.split(" ")[1]
    if(!token){
        res.status (401).json({Error: "Acceso denegado, no provee token "})
    }
    //verificar con nuestra clave o frase secreta 
    jsonwebtoken.verify(token, process.env.JWT_SECRET, (error, usuario )=>{
        if(error){
        res.status (403).json({Error: "token invalido."})
    }
    req.usuario = usuario
    next()

    })
}

module.exports = autenticacion