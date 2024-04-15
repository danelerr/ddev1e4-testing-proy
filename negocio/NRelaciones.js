const DRelaciones = require('../datos/DRelaciones');

class NRelaciones{

    static obtenerRelaciones = (callback) => {
        DRelaciones.obtenerRelaciones((error, relaciones) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                callback(null, relaciones);
            }
        });
    }

    static registrarRelacion = (req,res, callback)=>{
        const nuevaRelacion = {
            primer_miembro_id: req.body.primer_miembro_id,
            segundo_miembro_id: req.body.segundo_miembro_id,
            parentesco_id: req.body.parentesco_id
        };
        DRelaciones.registrarRelacion(nuevaRelacion, callback);
    }
}

module.exports = {
    obtenerRelaciones: NRelaciones.obtenerRelaciones,
    registrarRelacion: NRelaciones.registrarRelacion
}