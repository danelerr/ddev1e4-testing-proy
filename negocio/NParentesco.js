const DParentesco = require('../datos/DParentesco');

class NParentesco {
    constructor(parentescoDao = DParentesco) {
        this.parentescoDao = parentescoDao;
    }
    
    obtenerParentescos(callback) {
        this.parentescoDao.obtenerParentescos((error, parentescos) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                callback(null, parentescos);
            }
        });
    }

    obtenerTipoParentescos(idTipo, callback) {
        this.parentescoDao.obtenerParentesco(idTipo, (error, results) => {
            if (error) {
                callback(error, undefined);
                return;
            } else {
                // Verificar si hay resultados antes de intentar acceder a ellos
                if (results && results.length > 0) {
                    const tipo = results[0].tipo_parentesco;
                    callback(null, tipo);
                } else {
                    callback(null, undefined);
                }
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