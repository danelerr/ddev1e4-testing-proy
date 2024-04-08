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

module.exports = {
    obtenerMiembros: obtenerMiembros,
    registrarMiembro: registrarMiembro,
    eliminarMiembro: eliminarMiembro
}


