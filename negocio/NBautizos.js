const DBautizos = require('../datos/DBautizos');

class NBautizos {
    constructor(bautizosDao = DBautizos) {
        this.bautizosDao = bautizosDao;
    }
    
    obtenerBautizos(callback) {
        this.bautizosDao.obtenerBautizos((error, bautizos) => {
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
        this.bautizosDao.registrarBautizo(datosBautizo, callback);
    }
    
    eliminarBautizo(idBautizo, callback) {
        this.bautizosDao.eliminarBautizo(idBautizo, callback);
    }
    
    formatoFecha(fecha) {
        // Crear una nueva fecha con el año, mes y día para evitar problemas de zona horaria
        const fechaLocal = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
        
        // Ajustar para obtener el día correcto 
        const dia = fechaLocal.getDate();
        const mes = fechaLocal.getMonth() + 1; 
        const anio = fechaLocal.getFullYear();
    
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