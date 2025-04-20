const DMatrimonios = require('../datos/DMatrimonios');

class NMatrimonios {
    constructor(matrimoniosDAO = DMatrimonios) {
        this.matrimoniosDAO = matrimoniosDAO;
    }

    obtenerMatrimonios(callback) {
        this.matrimoniosDAO.obtenerMatrimonios((error, matrimonios) => {
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
        this.matrimoniosDAO.registrarMatrimonio(datosMatrimonio, callback);
    }
    
    eliminarMatrimonio(idMatrimonio, callback) {
        this.matrimoniosDAO.eliminarMatrimonio(idMatrimonio, callback);
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
const matrimoniosNegocio = new NMatrimonios();

module.exports = {
    NMatrimonios,
    obtenerMatrimonios: (callback) => matrimoniosNegocio.obtenerMatrimonios(callback),
    registrarMatrimonio: (datosMatrimonio, callback) => matrimoniosNegocio.registrarMatrimonio(datosMatrimonio, callback),
    eliminarMatrimonio: (idMatrimonio, callback) => matrimoniosNegocio.eliminarMatrimonio(idMatrimonio, callback)
}