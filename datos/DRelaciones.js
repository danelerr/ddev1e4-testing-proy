const conexion = require('../datos/conexion')
conexion.crearConexion();

class DRelaciones{
    constructor(id, primer_miembro_id, segundo_miembro_id, parentesco_id){
        this.id = id;
        this.primer_miembro_id = primer_miembro_id;
        this.segundo_miembro_id = segundo_miembro_id;
        this.parentesco_id = parentesco_id;
    }

    static obtenerRelaciones(callback) {
        const queryString = "SELECT * FROM relaciones";
        conexion.connection.query(queryString, (error, results) => {
            if (error) {
                callback(error, null);
                return
            } else {
                callback(null, results);
            }
        });
    }

    static registrarRelacion(nuevaRelacion){
        const queryString = 'INSERT INTO relaciones SET?';
        conexion.connection.query(queryString,nuevaRelacion,(error, results)=>{
            if (error) {
                return;
              }
        })
    }

}

module.exports = {
    obtenerRelaciones: DRelaciones.obtenerRelaciones,
    registrarRelacion: DRelaciones.registrarRelacion
}