const DMatrimonios = require('../datos/DMatrimonios');

class NMatrimonios {
    constructor(matrimoniosDao = DMatrimonios) {
        this.matrimoniosDao = matrimoniosDao;
    }

    obtenerMatrimonios(callback) {
        this.matrimoniosDao.obtenerMatrimonios((error, matrimonios) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                matrimonios.forEach(matrimonio => {
                    matrimonio.fecha = this.formatoFecha(matrimonio.fecha); 
                });
                callback(null, matrimonios);
            }
        });
    }
    
    registrarMatrimonio(datosMatrimonio, callback) {
        this.matrimoniosDao.registrarMatrimonio(datosMatrimonio, callback);
    }
    
    eliminarMatrimonio(idMatrimonio, callback) {
        this.matrimoniosDao.eliminarMatrimonio(idMatrimonio, callback);
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
const matrimoniosNegocio = new NMatrimonios();

module.exports = {
    NMatrimonios,
    obtenerMatrimonios: (callback) => matrimoniosNegocio.obtenerMatrimonios(callback),
    registrarMatrimonio: (datosMatrimonio, callback) => matrimoniosNegocio.registrarMatrimonio(datosMatrimonio, callback),
    eliminarMatrimonio: (idMatrimonio, callback) => matrimoniosNegocio.eliminarMatrimonio(idMatrimonio, callback)
}