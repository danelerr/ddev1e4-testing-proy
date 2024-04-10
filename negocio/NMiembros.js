const DMiembros = require('../datos/DMiembros')

const obtenerMiembros = (callback) => {
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

const registrarMiembro = (req,res, callback)=>{
    nuevoMiembro = {
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

const eliminarMiembro = (req,res, callback) =>{
    idMiembro = req.body.id;
    DMiembros.eliminarMiembro(idMiembro, callback);
}

const obtenerHombres= (callback) =>{
    DMiembros.obtenerHombres((error, hombres) => {
        if (error) {
            callback(error, null);
            return;
        } else {
            callback(null, hombres);
        }
    });
}

const obtenerMujeres= (callback) =>{
    DMiembros.obtenerMujeres((error, mujeres) => {
        if (error) {
            callback(error, null);
            return;
        } else {
            callback(null, mujeres);
        }
    });
}

const obtenerNombre = (idMiembro, callback) => {
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

module.exports = {
    obtenerMiembros: obtenerMiembros,
    registrarMiembro: registrarMiembro,
    eliminarMiembro: eliminarMiembro,
    obtenerHombres: obtenerHombres,
    obtenerMujeres: obtenerMujeres,
    obtenerNombre: obtenerNombre
}


