const DBautizos = require('../datos/DBautizos');

class NBautizos{
    
    static obtenerBautizos = (callback) => {
        DBautizos.obtenerBautizos((error, bautizos) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                bautizos.forEach(bautizo => {
                    bautizo.fecha = this.formatoFecha(bautizo.fecha); 
                });
                callback(null, bautizos);
            }
        });
    }
    
    static registrarBautizo = (req,res, callback)=>{
        const nuevoBautizo = {
            fecha: req.body.fecha,
            miembro_id: req.body.miembro_id,
        };
        DBautizos.registrarBautizo(nuevoBautizo, callback);
    }
    
    static eliminarBautizo = (req,res, callback) =>{
        const idBautizo = req.body.id;
        DBautizos.eliminarBautizo(idBautizo, callback);
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
    obtenerBautizos: NBautizos.obtenerBautizos,
    eliminarBautizo: NBautizos.eliminarBautizo,
    registrarBautizo: NBautizos.registrarBautizo
}