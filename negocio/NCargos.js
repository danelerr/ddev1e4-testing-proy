const DCargos = require('../datos/DCargos');

class NCargos {
    constructor(cargosDao = DCargos) {
        this.cargosDao = cargosDao;
    }

    obtenerCargos(callback) {
        this.cargosDao.obtenerCargos((error, cargos) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                cargos.forEach(cargo => {
                    cargo.fecha_inicio = this.formatoFecha(cargo.fecha_inicio); 
                });
                callback(null, cargos);
            }
        });
    }
    
    registrarCargo(datosCargo, callback) {
        const hoy = new Date();
        const nuevoCargo = {
            fecha_inicio: hoy,
            vigente: 1,
            miembro_id: datosCargo.miembro_id,
            ministerio_id: datosCargo.ministerio_id
        };
        this.cargosDao.registrarCargo(nuevoCargo, (error) => {
            // Cambiar null por undefined cuando no hay error
            callback(error || undefined);
        });
    }

    darDeBaja(idCargo, callback) {
        const fecha_fin = new Date();
        this.cargosDao.darDeBaja(idCargo, fecha_fin, (error, results) => {
            // Cambiar null por undefined cuando no hay error
            callback(error || undefined);
        });
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
const cargosNegocio = new NCargos();

module.exports = {
    NCargos,
    obtenerCargos: (callback) => cargosNegocio.obtenerCargos(callback),
    registrarCargo: (datosCargo, callback) => cargosNegocio.registrarCargo(datosCargo, callback),
    darDeBaja: (idCargo, callback) => cargosNegocio.darDeBaja(idCargo, callback)
}
