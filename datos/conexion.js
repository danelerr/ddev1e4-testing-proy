const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',    
  user: 'root',      
  password: '', 
  database: 'iglesia' 
});

function crearConexion(){
  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos: ' + err.stack);
      return;
    }
    console.log('Conexión exitosa a la base de datos con el ID ' + connection.threadId);
  });
}

function cerrarConexion(){
  connection.end((err)=>{
    if(err){
      console.log('Error al desconectar la base de datos: ' + err.stack);
      return;
    }
    console.log('Se desconectó la base de datos');
  })
}
module.exports = {
  connection: connection,
  crearConexion: crearConexion,
  cerrarConexion: cerrarConexion,
}