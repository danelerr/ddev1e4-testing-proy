const conexion = require('../datos/conexion')
conexion.crearConexion();

function obtenerMiembros(callback) {
    const queryString = "SELECT id, CONCAT(nombres, ' ', apellidos) AS nombres FROM miembros ORDER BY id DESC";
    conexion.connection.query(queryString, (error, results) => {
        if (error) {
            console.log('Error al obtener los datos:', error);
            callback(error, null);
            return
        } else {
            console.log('Datos obtenidos correctamente:', results);
            callback(null, results);
        }
    });
}

function registrarMiembro(nuevoMiembro){
    queryString = 'INSERT INTO miembros SET?';
    conexion.connection.query(queryString,nuevoMiembro,(error, results)=>{
        if (error) {
            console.error('Error al insertar datos: ', error);
            return;
          }
          console.log('Datos insertados correctamente: ', results);
    })
}

function eliminarMiembro(idMiembro){
    queryString = 'DELETE FROM miembros WHERE id = ?';
    conexion.connection.query(queryString,[idMiembro],(error, results) =>{
        if(error){
            console.log('Error al eliminar el miembro con id:' + idMiembro, error);
            return;
        }
        console.log('miembro eliminado correctamente: ', results);
    })
}

module.exports = {
    obtenerMiembros: obtenerMiembros,
    registrarMiembro: registrarMiembro,
    eliminarMiembro: eliminarMiembro
}