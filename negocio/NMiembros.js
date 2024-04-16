const DMiembros = require('../datos/DMiembros')

class NMiembros {
    static obtenerMiembros = (callback) => {
        DMiembros.obtenerMiembros((error, miembros) => {
            if (error) {
                console.log('Error al obtener los miembros:', error);
                callback(error, null);
                return;
            } else {
                callback(null, miembros);
            }
        });
    };
    
    static registrarMiembro = (req,res, callback)=>{
        const nuevoMiembro = {
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            sexo: req.body.sexo,
            fecha_nacimiento: req.body.fecha_nacimiento,
            estado_civil: req.body.estado_civil,
            ci: req.body.ci,
            domicilio: req.body.domicilio,
            celular: req.body.celular
        };
        DMiembros.registrarMiembro(nuevoMiembro, callback);
    }
    
    static eliminarMiembro = (req,res, callback) =>{
        const idMiembro = req.body.id;
        DMiembros.eliminarMiembro(idMiembro, callback);
    }
    
    static obtenerHombres= (callback) =>{
        DMiembros.obtenerHombres((error, hombres) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                callback(null, hombres);
            }
        });
    }
    
    static obtenerMujeres= (callback) =>{
        DMiembros.obtenerMujeres((error, mujeres) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                callback(null, mujeres);
            }
        });
    }
    
    static obtenerNombre = (idMiembro, callback) => {
        DMiembros.obtenerNombre(idMiembro, (error, results) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                const nombre = results[0] ? results[0].nombres : null;
                callback(null, nombre);
            }
        });
    }
}

module.exports = {
    obtenerMiembros: NMiembros.obtenerMiembros,
    registrarMiembro: NMiembros.registrarMiembro,
    eliminarMiembro: NMiembros.eliminarMiembro,
    obtenerHombres: NMiembros.obtenerHombres,
    obtenerMujeres: NMiembros.obtenerMujeres,
    obtenerNombre: NMiembros.obtenerNombre
}


