const DMinisterios = require("../datos/DMinisterios");

class NMinisterios{
    static obtenerMinisterios = (callback) => {
        DMinisterios.obtenerMinisterios((error, ministerios) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                callback(null, ministerios);
            }
        });
    }
    
    static obtenerMinisterio = (idMinisterio, callback) => {
        DMinisterios.obtenerMinisterio(idMinisterio, (error, results) => {
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

module.exports = {
    obtenerMinisterios: NMinisterios.obtenerMinisterios,
    obtenerMinisterio: NMinisterios.obtenerMinisterio
}