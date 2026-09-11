const express = require('express');  
const app = express(); 
require('dotenv').config();
const port = process.env.PUERTO || 3030; 
//importacion de middleware propios 
const registroMiddleware = require ("./middleware/registroMiddleware")


//middleware para parsear datos del boddy
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//middleware propios 
//este middleware se ejecuta siempre que se haga una peticion (get, post, put, delete)
app.use((req, res, next)=>{
    console.log (`Tiempo milisegundos: ${Date.now()} `)
    console.log (`Fecha: ${new Date().toISOString()} `)
    next()
})
app.use(registroMiddleware)


//leer archivo 
const sistemaArchivo = require ("fs")
const ruta = require ("path")
const rutaArchivo =ruta.join(__dirname, "datos.json")

//libreria subir archivos
const multer =require("multer")
//configurar el almacenamiento archivos 
const almacenamiento = multer.diskStorage({
    destination:(req, file, cd)=>{
        cd (null, "misImagenes/")
    },
    filename:(req, file, cd)=>{
        const extension = ruta.extname (file.originalname) 
        cd (null, `${Date.now()}${extension}`)
    }
})
const cargar =multer ({storage: almacenamiento})

app.get("/", (req, res) => { 
    res.send("Api resta aprendices"); 
});

//EMPOINT PARA LISTAR APRENDICES 
app.get ("/api/aprendices", (req, res) => {

    //leer archivo json 
    sistemaArchivo.readFile(rutaArchivo, "utf-8", (error, datos) =>{
        if (error){
            return res.status(500).json({Error: "Nose puede leer archivo o BD"}) 
        }
        const listaAprendices =JSON.parse (datos)
        res.status (200).json({"mensaje": listaAprendices})
    })
})

//EMPOINT PARA LISTAR UN APRENDIZ 
app.get ("/api/aprendices/:id", (req, res) => {
    res.status (200).json({
        "mensaje": "Lista 1 aprendiZ"
    })
})

//EMPOINT PARA CREAR APRENDICES 
app.post ("/api/aprendices", cargar.single("imagen"),(req, res)=>{
    //validar que se envien datos
    
    const datosAprendiz =req.body
    //agregar la ruta de la imagen 
    datosAprendiz.imagen = req.file?`/misimagenes/${req.file.filename}`:"sin imagen "
    //leer archivo
    sistemaArchivo.readFile(rutaArchivo, "utf-8", (error, datos) =>{
        if (error){
            return res.status(500).json({Error: "Nose puede leer archivo o BD"}) 
        }
        const listaAprendices =JSON.parse (datos)
        //adicionar el nuevo aprendiz a la lista
        listaAprendices.push (datosAprendiz)
        sistemaArchivo.writeFile(rutaArchivo, JSON.stringify(listaAprendices, null, 2),(error)=>{
            if(error){
                return res.status(500).json({Error: "Nose puede escribir en el archivo, o BD"})
            }
            res.status (200).json({"mensaje": "Aprendiz creado", "Datos Aprendiz": datosAprendiz})
        })
        
    })
})

//EMPINT PARA EDITAR APRENDIZ
app.put ("/api/aprendices/:id", (req, res)=>{
    res.status(200).json({
        "mensaje": "editar aprendices"
    })
})

//EMPOINT PARA ELIMINAR APRENDIZ
app.delete ("/api/aprendices/:id", (req, res)=>{
    res.status(200).json({
        "mensaje": "eliminar aprendices"
    })
})

app.listen(port, () => { 
    console.log( `SERVIDOR: http://localhost:${port}`); 
}); 
