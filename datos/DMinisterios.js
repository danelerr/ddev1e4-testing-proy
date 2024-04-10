const conexion = require('../datos/conexion')
conexion.crearConexion();

class DMinisterio{
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    static obtenerMinisterios(callback) {
        const queryString = "SELECT * FROM ministerios ORDER BY id DESC";
        conexion.connection.query(queryString, (error, results) => {
            if (error) {
                callback(error, null);
                return
            } else {
                callback(null, results);
            }
        });
    }

    static obtenerMinisterio(idMinisterio, callback) {
        const queryString = "SELECT nombre FROM ministerios where id = ?";
        conexion.connection.query(queryString, [idMinisterio],(error, results) => {
            if (error) {
                callback(error, null);
                return
            } else {
                callback(null, results);
            }
        });
    }
}

module.exports = {
    obtenerMinisterios: DMinisterio.obtenerMinisterios,
    obtenerMinisterio: DMinisterio.obtenerMinisterio
}