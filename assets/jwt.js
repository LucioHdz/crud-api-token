const jwt=require('jsonwebtoken');
require('dotenv').config();

const EXPIRES_IN='6h';

module.exports.createToken=(body)=>{
    const token=jwt.sign(body,process.env.KEY_JWT,{expiresIn:EXPIRES_IN});
    return token;
}
module.exports.validateToken=(token)=>{
    var obj = {status:2};
    jwt.verify(token,process.env.KEY_JWT,(err,decode)=>{
        if(err){
            if(err.name === 'TokenExpiredError'){
                obj ={status:1};//El token ya no es valido
            }else{
                obj =  {status:2}; //El token no es valido
            }
        }else{
            obj = {datos:decode,status:3};//El token es valido
        }
    });
    return obj;
}