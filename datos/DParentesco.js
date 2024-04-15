const conexion = require('../datos/conexion')
conexion.crearConexion();

class DParentesco{
    constructor(id, tipo_parentesco){
        this.id = id;
        this.tipo_parentesco = tipo_parentesco;
    }

    static obtenerParentescos(callback) {
        const queryString = "SELECT * FROM parentesco ORDER BY id DESC";
        conexion.connection.query(queryString, (error, results) => {
            if (error) {
                callback(error, null);
                return
            } else {
                callback(null, results);
            }
        });
    }

    static obtenerParentesco(callback) {
        const queryString = "SELECT tipo_parentesco FROM parentesco";
        conexion.connection.query(queryString, (error, results) => {
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
    obtenerParentescos: DParentesco.obtenerParentescos,
    obtenerParentesco: DParentesco.obtenerParentesco
}