const conexion = require('../datos/conexion')
conexion.crearConexion();

class DBautizo{
    constructor(id, fecha, miembro_id){
        this.id = id;
        this.fecha = fecha;
        this.miembro_id = miembro_id;
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

    static registrarBautizo(nuevoBautizo){
        const queryString = 'INSERT INTO bautizos SET?';
        conexion.connection.query(queryString,nuevoBautizo,(error, results)=>{
            if (error) {
                console.error('Error al insertar datos: ', error);
                return;
              }
              console.log('Datos insertados correctamente: ', results);
        })
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
    eliminarBautizo: DBautizo.eliminarBautizo,
    registrarBautizo: DBautizo.registrarBautizo
}