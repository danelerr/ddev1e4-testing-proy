const DMinisterios = require("../datos/DMinisterios");

class NMinisterios {
    constructor(ministeriosDao = DMinisterios) {
        this.ministeriosDao = ministeriosDao;
    }

    obtenerMinisterios(callback) {
        this.ministeriosDao.obtenerMinisterios((error, ministerios) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                callback(null, ministerios);
            }
        });
    }
    
    obtenerMinisterio(idMinisterio, callback) {
        this.ministeriosDao.obtenerMinisterio(idMinisterio, (error, results) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                const nombre = results[0] ? results[0].nombre : null;
                callback(null, nombre);
            }
        });
    }
}

// Instancia por defecto para mantener compatibilidad
const ministeriosNegocio = new NMinisterios();

module.exports = {
    NMinisterios,
    obtenerMinisterios: (callback) => ministeriosNegocio.obtenerMinisterios(callback),
    obtenerMinisterio: (idMinisterio, callback) => ministeriosNegocio.obtenerMinisterio(idMinisterio, callback)
}