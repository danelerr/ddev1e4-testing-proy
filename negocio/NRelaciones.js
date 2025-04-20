const DRelaciones = require('../datos/DRelaciones');

class NRelaciones {
    constructor(relacionesDAO = DRelaciones) {
        this.relacionesDAO = relacionesDAO;
    }

    obtenerRelaciones(callback) {
        this.relacionesDAO.obtenerRelaciones((error, relaciones) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                callback(null, relaciones);
            }
        });
    }

    registrarRelacion(datosRelacion, callback) {
        this.relacionesDAO.registrarRelacion(datosRelacion, callback);
    }
}

// Instancia por defecto para mantener compatibilidad
const relacionesNegocio = new NRelaciones();

module.exports = {
    NRelaciones,
    obtenerRelaciones: (callback) => relacionesNegocio.obtenerRelaciones(callback),
    registrarRelacion: (datosRelacion, callback) => relacionesNegocio.registrarRelacion(datosRelacion, callback)
}