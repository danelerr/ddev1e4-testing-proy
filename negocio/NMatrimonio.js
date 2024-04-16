const DMatrimonios = require('../datos/DMatrimonios');

class NMatrimonios{

    static obtenerMatrimonios = (callback) => {
        DMatrimonios.obtenerMatrimonios((error, matrimonios) => {
            if (error) {
                callback(error, null);
                return;
            } else {
                matrimonios.forEach(matrimonio => {
                    matrimonio.fecha = this.formatoFecha(matrimonio.fecha); 
                });
                callback(null, matrimonios);
            }
        });
    }
    
    static registrarMatrimonio = (req,res, callback)=>{
        const nuevoMatrimonio = {
            fecha: req.body.fecha,
            novio_id: req.body.novio_id,
            novia_id: req.body.novia_id
        };
        DMatrimonios.registrarMatrimonio(nuevoMatrimonio, callback);
    }
    
    static eliminarMatrimonio = (req,res, callback) =>{
        const idMatrimonio = req.body.id;
        DMatrimonios.eliminarMatrimonio(idMatrimonio, callback);
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
    obtenerMatrimonios: NMatrimonios.obtenerMatrimonios,
    eliminarMatrimonio: NMatrimonios.eliminarMatrimonio,
    registrarMatrimonio: NMatrimonios.registrarMatrimonio
}