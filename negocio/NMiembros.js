const DMiembros = require('../datos/DMiembros');

// Logger configurable para manejar mensajes de error
const logger = {
    log: (message, error) => {
        if (process.env.NODE_ENV !== 'test') {
            console.log(message, error);
        }
    }
};

class NMiembros {
    constructor(miembrosDao = DMiembros) {
        this.miembrosDao = miembrosDao;
    }
    
    obtenerMiembros(callback) {
        this.miembrosDao.obtenerMiembros((error, miembros) => {
            if (error) {
                logger.log('Error al obtener los miembros:', error);
                callback(error, null);
                return;
            } else {
                callback(null, miembros);
            }
        });
    }
    
    registrarMiembro(datosMiembro, callback) {
        this.miembrosDao.registrarMiembro(datosMiembro, (error) => {
            if (error) {
                logger.log('Error al registrar miembro:', error);
                if (callback) callback(error);
                return;
            }
            if (callback) callback(null);
        });
    }
    
    eliminarMiembro(idMiembro, callback) {
        this.miembrosDao.eliminarMiembro(idMiembro, (error) => {
            if (error) {
                logger.log('Error al eliminar miembro:', error);
                if (callback) callback(error);
                return;
            }
            if (callback) callback(null);
        });
    }
    
    obtenerHombres(callback) {
        this.miembrosDao.obtenerHombres((error, hombres) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                callback(null, hombres);
            }
        });
    }
    
    obtenerMujeres(callback) {
        this.miembrosDao.obtenerMujeres((error, mujeres) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                callback(null, mujeres);
            }
        });
    }
    
    obtenerNombre(idMiembro, callback) {
        this.miembrosDao.obtenerNombre(idMiembro, (error, results) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                const nombre = results[0] ? results[0].nombres : null;
                callback(null, nombre);
            }
        });
    }
}

// Instancia por defecto para mantener compatibilidad
const miembrosNegocio = new NMiembros();

module.exports = {
    NMiembros,
    obtenerMiembros: (callback) => miembrosNegocio.obtenerMiembros(callback),
    registrarMiembro: (datosMiembro, callback) => miembrosNegocio.registrarMiembro(datosMiembro, callback),
    eliminarMiembro: (idMiembro, callback) => miembrosNegocio.eliminarMiembro(idMiembro, callback),
    obtenerHombres: (callback) => miembrosNegocio.obtenerHombres(callback),
    obtenerMujeres: (callback) => miembrosNegocio.obtenerMujeres(callback),
    obtenerNombre: (idMiembro, callback) => miembrosNegocio.obtenerNombre(idMiembro, callback)
};


