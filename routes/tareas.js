const { validateToken } = require('../assets/jwt');
const connection = require('../database/config');
const { obtenerTareas, agregarTareas, actualizarTareas, eliminarTareas } = require('../database/tarea.operaciones');

const tareas = require('express').Router();



tareas.get('/',(req,res)=>{
    const token = req.headers['authorization'] || '123';

    const validacion = validateToken(token);
    if(validacion.status == 1){
        res.status(403).json({message:'Acceso denegado por token expirado'});
    }else if (validacion.status == 2){
        res.status(403).json({message: 'El acceso no es un token valido'});
    }else{
        let idUsuario = validacion.datos.id_usuario;
        obtenerTareas(connection,idUsuario,(err,resp)=>{
            if(err) res.status(500).json({message:err.message || 'Error al leer la base de datos, intentalo de nuevo mas tarde'});
            else res.status(200).json(resp);
        })
    }
})


tareas.post('/',(req,res)=>{
    const token = req.headers['authorization'];

    const validacion = validateToken(token);
    if(validacion.status == 1){
        res.status(403).json({message:'Acceso denegado por token expirado'});
    }else if (validacion.status == 2){
        res.status(403).json({message: 'El acceso no es un token valido'});
    }else{
        let idUsuario = validacion.datos.id_usuario;
        const {tarea} = req.body;
        agregarTareas(connection,idUsuario,tarea,(err,resp)=>{
            if(err) res.status(500).json({message: err.message || 'No se pudo conectar a la base de datos, intenta de nuevo mas tarde'});
            else res.status(200).json(resp);
        })
        
        
        
    }
});


tareas.put('/:idTarea',(recibido,mandar)=>{ 
    const token = recibido.headers['authorization'];
    
    const validacion = validateToken(token);
    if(validacion.status == 1){
        mandar.status(403).json({message:'Acceso denegado por token expirado'});
    }else if (validacion.status == 2){
        mandar.status(403).json({message: 'El acceso no es un token valido'});
    }else{
        const {idTarea} = recibido.params;
        const tarea = recibido.body;
        actualizarTareas(connection, {...tarea,idTarea},(err,respuesta)=>{
            if(err) mandar.status(500).json({message: err.message || 'No se pudo Actualizar la Tarea'});
            else mandar.status(200).json(respuesta);
        });
    }
})
tareas.delete('/:idTarea',(recibido,mandar)=>{ 
    const token = recibido.headers['authorization'];
    
    const validacion = validateToken(token);
    if(validacion.status == 1){
        mandar.status(403).json({message:'Acceso denegado por token expirado'});
    }else if (validacion.status == 2){
        mandar.status(403).json({message: 'El acceso no es un token valido'});
    }else{
        const {idTarea} = recibido.params;
        eliminarTareas(connection, idTarea,(err,respuesta)=>{
            if(err) mandar.status(500).json({message: err.message || 'No se pudo Eliminar la Tarea'});
            else mandar.status(200).json(respuesta);
        });
    }
})




module.exports = tareas;