import express from 'express';
import "dotenv/config"
const app = express();  
const port = process.env.PUERTO || 3000; 

app.get("/", (_, res) => { 
    res.send("Aprendicez ficha 3407186 SENA"); 
});

app.listen(port, () => { 
    console.log( `SERVIDOR: https://localhost:${port}`); 
}); 

