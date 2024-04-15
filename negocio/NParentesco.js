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

    static obtenerTipoParentescos = (idTipo, callback) => {
        DParentesco.obtenerParentesco(idTipo, (error, results) => {
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

module.exports = {
    obtenerParentescos: NParentesco.obtenerParentescos,
    obtenerParentesco: NParentesco.obtenerTipoParentescos
}