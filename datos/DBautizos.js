const conexion = require('../datos/conexion')
conexion.crearConexion();

class DBautizo{
    constructor(id, fecha, miembro_id, padre_id){
        this.id = id;
        this.fecha = fecha;
        this.miembro_id = miembro_id;
        this.padre_id = padre_id;
    }

    static obtenerBautizos(callback) {
        const queryString = "select * from bautizos order by id desc"
        conexion.connection.query(queryString, (error, results) => {
            if (error) {
                callback(error, null);
                return
            } else {
                callback(null, results);
            }
        });
    }

    static eliminarBautizo(idBautizo){
        const queryString = 'DELETE FROM bautizos WHERE id = ?';
        conexion.connection.query(queryString,[idBautizo],(error, results) =>{
            if(error){
                console.log('Error al eliminar el bautizo: ', error);
                return;
            }
            console.log('miembro eliminado correctamente: ', results);
        })
    }
}

module.exports = {
    obtenerBautizos: DBautizo.obtenerBautizos,
    eliminarBautizo: DBautizo.eliminarBautizo
}