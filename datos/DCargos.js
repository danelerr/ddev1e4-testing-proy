const conexion = require('../datos/conexion')


class DCargos{
    constructor(id, fecha_inicio, fecha_fin, vigente, miembro_id, ministerio_id){
        this.id = id;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.vivente = vigente;
        this.miembro_id = miembro_id;
        this.ministerio_id = ministerio_id;
    }

    static obtenerCargos(callback) {
        const queryString = "SELECT * FROM cargos WHERE vigente = 1 ORDER BY id DESC";
        conexion.connection.query(queryString, (error, results) => {
            if (error) {
                callback(error, null);
                return
            } else {
                callback(null, results);
            }
        });
    }

    static registrarCargo(nuevoCargo, callback){
        const queryString = 'INSERT INTO cargos SET?';
        conexion.connection.query(queryString, nuevoCargo, (error, results) => {
            if (error) {
                console.error('Error al insertar datos: ', error);
                if (callback) callback(error);
                return;
            }
            console.log('Datos insertados correctamente: ', results);
            if (callback) callback(null);
        });
    }

    static darDeBaja(idCargo, fecha_fin, callback) {
        const queryString = "UPDATE cargos SET vigente = 0, fecha_fin = ? where id = ?";
        conexion.connection.query(queryString, [fecha_fin, idCargo],(error, results) => {
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
    obtenerCargos: DCargos.obtenerCargos,
    registrarCargo: DCargos.registrarCargo,
    darDeBaja: DCargos.darDeBaja
}