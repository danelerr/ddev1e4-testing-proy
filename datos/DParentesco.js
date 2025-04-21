const conexion = require('../datos/conexion')

class DParentesco{
    constructor(id, tipo_parentesco){
        this.id = id;
        this.tipo_parentesco = tipo_parentesco;
    }

    static obtenerParentescos(callback) {
        const queryString = "SELECT * FROM parentesco";
        conexion.connection.query(queryString, (error, results) => {
            if (error) {
                callback(error, null);
                return
            } else {
                callback(null, results);
            }
        });
    }

    static obtenerParentesco(idTipo, callback) {
        const queryString = "SELECT * FROM parentesco where id = ?";
        conexion.connection.query(queryString,[idTipo],(error, results) => {
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