const DBautizos = require('../datos/DBautizos');

class NBautizos {
    constructor(bautizosDAO = DBautizos) {
        this.bautizosDAO = bautizosDAO;
    }
    
    obtenerBautizos(callback) {
        this.bautizosDAO.obtenerBautizos((error, bautizos) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                bautizos.forEach(bautizo => {
                    bautizo.fecha = this.formatoFecha(bautizo.fecha); 
                });
                callback(null, bautizos);
            }
        });
    }
    
    registrarBautizo(datosBautizo, callback) {
        this.bautizosDAO.registrarBautizo(datosBautizo, callback);
    }
    
    eliminarBautizo(idBautizo, callback) {
        this.bautizosDAO.eliminarBautizo(idBautizo, callback);
    }
    
    formatoFecha(fecha) {
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1; 
        const anio = fecha.getFullYear();
    
        const diaStr = (dia < 10) ? '0' + dia : dia;
        const mesStr = (mes < 10) ? '0' + mes : mes;
    
        return `${diaStr}/${mesStr}/${anio}`;
    }
}

// Instancia por defecto para mantener compatibilidad
const bautizosNegocio = new NBautizos();

module.exports = {
    NBautizos,
    obtenerBautizos: (callback) => bautizosNegocio.obtenerBautizos(callback),
    registrarBautizo: (datosBautizo, callback) => bautizosNegocio.registrarBautizo(datosBautizo, callback),
    eliminarBautizo: (idBautizo, callback) => bautizosNegocio.eliminarBautizo(idBautizo, callback)
}