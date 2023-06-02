module.exports.obtenerTareas = (cnx, id, callback) => {
    cnx.query(`SELECT * FROM tarea where idusuario = ${id}`, (err,res) => {
        if(err) callback(err,null);
        else callback(null, res); 
    });
}
module.exports.agregarTareas = (cnx, id, tarea, callback) => {
    cnx.query(`INSERT INTO tarea VALUES (DEFAULT,"${tarea}","0",${id}) `, (err,res) => {
        if(err) callback(err,null);
        else callback(null, res); 
    });
}



module.exports.actualizarTareas = (cnx,body,callback)=>{
    cnx.query(`UPDATE tarea SET descripcion = '${body.descripcion}' , status = '${body.status}' where id_tarea = ${body.idTarea}`,(err,res)=>{
        if (err)  callback(err,null);
        else  callback(null,res);
    })
}

module.exports.eliminarTareas = (cnx,idTarea,callback)=>{
    cnx.query(`DELETE FROM tarea WHERE id_tarea = ${idTarea}`,(err,res)=>{
        if (err)  callback(err,null);
        else  callback(null,res);
    })
}