const DParentesco = require('../datos/DParentesco');

class NParentesco {
    constructor(parentescoDAO = DParentesco) {
        this.parentescoDAO = parentescoDAO;
    }
    
    obtenerParentescos(callback) {
        this.parentescoDAO.obtenerParentescos((error, parentescos) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                callback(null, parentescos);
            }
        });
    }

    obtenerTipoParentescos(idTipo, callback) {
        this.parentescoDAO.obtenerParentesco(idTipo, (error, results) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                const tipo = results[0].tipo_parentesco
                callback(null, tipo);
            }
        });
    }
}

// Instancia por defecto para mantener compatibilidad
const parentescoNegocio = new NParentesco();

module.exports = {
    NParentesco, // Exportamos la clase para poder hacer pruebas unitarias e inyección de dependencias
    // Exportamos funciones para mantener la API existente
    obtenerParentescos: (callback) => parentescoNegocio.obtenerParentescos(callback),
    obtenerParentesco: (idTipo, callback) => parentescoNegocio.obtenerTipoParentescos(idTipo, callback)
}