const mysql = require('mysql2');

let connection = null;

function crearConexion() {
  if (!connection) {
    connection = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'iglesia'
    });

    connection.connect((err) => {
      if (err) {
        console.error('Error al conectar a la base de datos: ' + err.stack);
        return;
      }
      console.log('Conexión exitosa a la base de datos con el ID ' + connection.threadId);
    });
  }
}

function cerrarConexion() {
  if (connection) {
    connection.end((err) => {
      if (err) {
        console.log('Error al desconectar la base de datos: ' + err.stack);
        return;
      }
      console.log('Se desconectó la base de datos');
      connection = null;
    });
  }
}

function getConnection() {
  if (!connection) {
    throw new Error('La conexión no ha sido creada. Llama a crearConexion() primero.');
  }
  return connection;
}

module.exports = {
  crearConexion,
  cerrarConexion,
  get connection() {
    return getConnection();
  }
};
