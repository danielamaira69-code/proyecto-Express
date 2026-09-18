//ruta de solo prueba 
const {Router}=require("express")
const enrutador =Router()
const mostrarRuta = require ("../controllers/rutaPruebaController")

//funcion (req,res) debe ir en un controlador 
enrutador.get("/rutaPersonal", mostrarRuta)

enrutador.get ("/usuarios", (req, res)=>{
    res.json({mensaje:"es mi usuario"})
})

module.exports= enrutador 
