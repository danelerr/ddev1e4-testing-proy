const DParentesco = require('../datos/DParentesco');

class NParentesco{
    
    static obtenerParentescos = (callback) => {
        DParentesco.obtenerParentescos((error, parentescos) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                callback(null, parentescos);
            }
        });
    }

    static obtenerTipoParentescos = (callback) => {
        DParentesco.obtenerParentesco((error, tipo) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                callback(null, tipo);
            }
        });
    }
}

module.exports = {
    obtenerParentescos: NParentesco.obtenerParentescos,
    obtenerParentesco: NParentesco.obtenerTipoParentescos
}