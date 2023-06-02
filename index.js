//IMPORTAR EXPRESS
const express=require ('express');
const cors=require('cors');
const usuarios = require('./routes/usuarios');
const tareas = require('./routes/tareas');
require('dotenv').config();
//const connection = require('./database/config');
//USAMOS EXPRESS PARA CREAR EL SERVIDOR
const app=express();
//montamos el servidor en el puerto 3030
app.listen(process.env.PORT,()=>{
    console.log('Servidor en puerto 3030');
})
//midleware es para que se comuniquen diferentes lenguajes
app.use(express.json());
app.use(cors());

app.use('/usuario',usuarios);
app.use('/tareas',tareas);