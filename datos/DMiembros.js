const conexion = require('../datos/conexion')
conexion.crearConexion();

class DMiembro{
    constructor(id,nombres,apellidos,sexo,fecha_nacimiento,estado_civil,ci,domicilio,celular){
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.sexo = sexo;
        this.fecha_nacimiento = fecha_nacimiento;
        this.estado_civil = estado_civil;
        this.ci = ci;
        this.domicilio = domicilio;
        this.celular =celular;
    }

    static obtenerMiembros(callback) {
        const queryString = "SELECT id, celular, domicilio, CONCAT(nombres, ' ', apellidos) AS nombres FROM miembros ORDER BY id DESC";
        conexion.connection.query(queryString, (error, results) => {
            if (error) {
                callback(error, null);
                return
            } else {
                callback(null, results);
            }
        });
    }
    
    static registrarMiembro(nuevoMiembro){
        const queryString = 'INSERT INTO miembros SET?';
        conexion.connection.query(queryString,nuevoMiembro,(error, results)=>{
            if (error) {
                return;
              }
        })
    }
    
    static eliminarMiembro(idMiembro){
        const queryString = 'DELETE FROM miembros WHERE id = ?';
        conexion.connection.query(queryString,[idMiembro],(error, results) =>{
            if(error){
                return;
            }
        })
    }

    static obtenerHombres(callback){
        const queryString = "select id, CONCAT(nombres, ' ', apellidos) AS nombres from miembros where sexo = 'M'"
        conexion.connection.query(queryString, (error, results) => {
            if (error) {
                callback(error, null);
                return
            } else {
                callback(null, results);
            }
        });
    }

    static obtenerMujeres(callback){
        const queryString = "select id, CONCAT(nombres, ' ', apellidos) AS nombres from miembros where sexo = 'F'"
        conexion.connection.query(queryString, (error, results) => {
            if (error) {
                callback(error, null);
                return
            } else {
                callback(null, results);
            }
        });
    }

    static obtenerNombre(idMiembro, callback){
        const queryString = "select CONCAT(nombres, ' ', apellidos) AS nombres from miembros where id = ?"
        conexion.connection.query(queryString, [idMiembro],(error, results) => {
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
    obtenerMiembros: DMiembro.obtenerMiembros,
    registrarMiembro: DMiembro.registrarMiembro,
    eliminarMiembro: DMiembro.eliminarMiembro,
    obtenerHombres: DMiembro.obtenerHombres,
    obtenerMujeres: DMiembro.obtenerMujeres,
    obtenerNombre: DMiembro.obtenerNombre
}