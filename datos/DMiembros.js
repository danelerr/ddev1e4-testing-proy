const conexion = require('../datos/conexion')
conexion.crearConexion();

class DMiembro{
    constructor(id,nombres,apellidos,sexo,fecha_nacimiento,estado_civil,ci,domicilio,celular){
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.sexo = sexo;
        this.fecha_nacimiento = fecha_nacimiento;
        this.fecha_nacimiento
        this.estado_civil = estado_civil;
        this.ci = ci;
        this.domicilio = domicilio;
        this.celular =celular;
    }

    static obtenerMiembros(callback) {
        const queryString = "SELECT id, CONCAT(nombres, ' ', apellidos) AS nombres FROM miembros ORDER BY id DESC";
        conexion.connection.query(queryString, (error, results) => {
            if (error) {
                console.log('Error al obtener los datos:', error);
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
                console.error('Error al insertar datos: ', error);
                return;
              }
              console.log('Datos insertados correctamente: ', results);
        })
    }
    
    static eliminarMiembro(idMiembro){
        const queryString = 'DELETE FROM miembros WHERE id = ?';
        conexion.connection.query(queryString,[idMiembro],(error, results) =>{
            if(error){
                console.log('Error al eliminar el miembro con id:' + idMiembro, error);
                return;
            }
            console.log('miembro eliminado correctamente: ', results);
        })
    }
}

module.exports = {
    obtenerMiembros: DMiembro.obtenerMiembros,
    registrarMiembro: DMiembro.registrarMiembro,
    eliminarMiembro: DMiembro.eliminarMiembro
}