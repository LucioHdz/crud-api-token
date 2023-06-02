const mysql=require('mysql');
const connection=mysql.createConnection({
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    database:process.env.DB_DATABASE
});
connection.connect((err,args)=>{
    if(err) throw err;
    console.log('Conectado a la base de datos');
});
module.exports=connection;