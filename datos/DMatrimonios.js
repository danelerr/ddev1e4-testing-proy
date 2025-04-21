const conexion = require('../datos/conexion');

class DMatrimonio{
    constructor(id, fecha, novio_id, novia_id){
        this.id = id;
        this.fecha = fecha;
        this.novio_id = novio_id;
        this.novia_id = novia_id;
    }

    static obtenerMatrimonios(callback) {
        const queryString = "select * from matrimonios order by id desc"
        conexion.connection.query(queryString, (error, results) => {
            if (error) {
                callback(error, null);
                return
            } else {
                callback(null, results);
            }
        });
    }

    static registrarMatrimonio(nuevoMatrimonio, callback){
        const queryString = 'INSERT INTO matrimonios SET?';
        conexion.connection.query(queryString, nuevoMatrimonio, (error, results) => {
            if (error) {
                console.error('Error al insertar datos: ', error);
                if (callback) callback(error);
                return;
            }
            console.log('Datos insertados correctamente: ', results);
            if (callback) callback(null);
        });
    }

    static eliminarMatrimonio(idMatrimonio, callback){
        const queryString = 'DELETE FROM matrimonios WHERE id = ?';
        conexion.connection.query(queryString, [idMatrimonio], (error, results) => {
            if (error) {
                console.log('Error al eliminar el matrimonio: ', error);
                if (callback) callback(error);
                return;
            }
            console.log('Matrimonio eliminado correctamente: ', results);
            if (callback) callback(null);
        });
    }
}

module.exports = {
    obtenerMatrimonios: DMatrimonio.obtenerMatrimonios,
    eliminarMatrimonio: DMatrimonio.eliminarMatrimonio,
    registrarMatrimonio: DMatrimonio.registrarMatrimonio
}