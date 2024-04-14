const DCargos = require('../datos/DCargos');

class NCargos{

    static obtenerCargos = (callback) => {
        DCargos.obtenerCargos((error, cargos) => {
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
    
    static registrarCargo = (req,res, callback)=>{
        const hoy = new Date();
        const nuevoCargo = {
            fecha_inicio: hoy,
            vigente: 1,
            miembro_id: req.body.miembro_id,
            ministerio_id: req.body.ministerio_id
        };
        DCargos.registrarCargo(nuevoCargo, callback);
    }

    static darDeBaja = (req,res, callback) =>{
        const idCargo = req.body.id;
        const fecha_fin = new Date();
        DCargos.darDeBaja(idCargo, fecha_fin, callback);
    }

    static formatoFecha(fecha) {
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1; 
        const anio = fecha.getFullYear();
    
        const diaStr = (dia < 10) ? '0' + dia : dia;
        const mesStr = (mes < 10) ? '0' + mes : mes;
    
        return `${diaStr}/${mesStr}/${anio}`;
    }
}

module.exports = {
    obtenerCargos: NCargos.obtenerCargos,
    registrarCargo: NCargos.registrarCargo,
    darDeBaja: NCargos.darDeBaja
}
