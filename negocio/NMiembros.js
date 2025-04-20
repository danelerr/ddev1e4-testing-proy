const DMiembros = require('../datos/DMiembros')

class NMiembros {
    constructor(miembrosDAO = DMiembros) {
        this.miembrosDAO = miembrosDAO;
    }
    
    obtenerMiembros(callback) {
        this.miembrosDAO.obtenerMiembros((error, miembros) => {
            if (error) {
                console.log('Error al obtener los miembros:', error);
                callback(error, null);
                return;
            } else {
                callback(null, miembros);
            }
        });
    }
    
    registrarMiembro(datosMiembro, callback) {
        this.miembrosDAO.registrarMiembro(datosMiembro, (error) => {
            if (error) {
                console.log('Error al registrar miembro:', error);
                if (callback) callback(error);
                return;
            }
            if (callback) callback(null);
        });
    }
    
    eliminarMiembro(idMiembro, callback) {
        this.miembrosDAO.eliminarMiembro(idMiembro, (error) => {
            if (error) {
                console.log('Error al eliminar miembro:', error);
                if (callback) callback(error);
                return;
            }
            if (callback) callback(null);
        });
    }
    
    obtenerHombres(callback) {
        this.miembrosDAO.obtenerHombres((error, hombres) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                callback(null, hombres);
            }
        });
    }
    
    obtenerMujeres(callback) {
        this.miembrosDAO.obtenerMujeres((error, mujeres) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                callback(null, mujeres);
            }
        });
    }
    
    obtenerNombre(idMiembro, callback) {
        this.miembrosDAO.obtenerNombre(idMiembro, (error, results) => {
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
}


