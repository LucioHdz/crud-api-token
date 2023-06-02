const { createToken } = require("../assets/jwt");

module.exports.crearUusario=(cnx, body,callback)=>{
    cnx.query(
        `INSERT INTO usuario VALUES(DEFAULT,'${body.usuario}','${body.contrasena}',${body.permiso})`,
        (err,res)=>{
            if(err){
                callback(err,null);
            }else{
                callback(null,res);
            }
        }
    );
};
module.exports.logearUsuario=(cnx, body,callback)=>{
    cnx.query(
        `SELECT id_usuario, permiso FROM usuario WHERE nombre='${body.usuario}' and contrasena='${body.contrasena}'`,
        (err,res)=>{
            if(err){
                callback(err,null);
            }else{
                //si estan los datos bien te retorna el usuario
                if(res.length>=1){
                    //si valido el usuario
                    const datos={
                        id_usuario:res[0].id_usuario,
                        permiso:res[0].permiso
                    };
                    //generamos el token
                    const token=createToken(datos);
                    //mandamos una resuesta
                    callback(null,{token});
                }else{
                    callback({message:'Error usuario o contraseña incorrecta'},null);
                }
            }
        }
    );  
};