const DCargos = require('../datos/DCargos');

class NCargos {
    constructor(cargosDAO = DCargos) {
        this.cargosDAO = cargosDAO;
    }

    obtenerCargos(callback) {
        this.cargosDAO.obtenerCargos((error, cargos) => {
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
        this.cargosDAO.registrarCargo(nuevoCargo, callback);
    }

    darDeBaja(idCargo, callback) {
        const fecha_fin = new Date();
        this.cargosDAO.darDeBaja(idCargo, fecha_fin, callback);
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
const cargosNegocio = new NCargos();

module.exports = {
    NCargos,
    obtenerCargos: (callback) => cargosNegocio.obtenerCargos(callback),
    registrarCargo: (datosCargo, callback) => cargosNegocio.registrarCargo(datosCargo, callback),
    darDeBaja: (idCargo, callback) => cargosNegocio.darDeBaja(idCargo, callback)
}
