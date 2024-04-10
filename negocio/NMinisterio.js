const DMinisterios = require("../datos/DMinisterios");

const obtenerMinisterios = (callback) => {
    DMinisterios.obtenerMinisterios((error, ministerios) => {
        if (error) {
            callback(error, null);
            return;
        } else {
            callback(null, ministerios);
        }
    });
}

const obtenerMinisterio = (idMinisterio, callback) => {
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

module.exports = {
    obtenerMinisterios: obtenerMinisterios,
    obtenerMinisterio: obtenerMinisterio
}