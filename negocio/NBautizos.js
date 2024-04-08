const DBautizos = require('../datos/DBautizos');

const obtenerBautizos = (callback) => {
    DBautizos.obtenerBautizos((error, bautizos) => {
        if (error) {
            console.log('Error al obtener los bautizos:', error);
            callback(error, null);
            return;
        } else {
            bautizos.forEach(bautizo => {
                bautizo.fecha = formatoFecha(bautizo.fecha); 
            });
            callback(null, bautizos);
        }
    });
}

const registrarBautizo = (req,res, callback)=>{
    nuevoBautizo = {
        fecha: req.body.fecha,
        miembro_id: req.body.miembro_id,
    };
    DBautizos.registrarBautizo(nuevoBautizo, callback);
}

const eliminarBautizo = (req,res, callback) =>{
    idBautizo = req.body.id;
    DBautizos.eliminarBautizo(idBautizo, callback);
}

function formatoFecha(fecha) {
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; 
    const anio = fecha.getFullYear();

    const diaStr = (dia < 10) ? '0' + dia : dia;
    const mesStr = (mes < 10) ? '0' + mes : mes;

    return `${diaStr}/${mesStr}/${anio}`;
}

module.exports = {
    obtenerBautizos: obtenerBautizos,
    eliminarBautizo: eliminarBautizo,
    registrarBautizo: registrarBautizo
}