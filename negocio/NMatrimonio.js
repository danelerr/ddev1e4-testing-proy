const DMatrimonios = require('../datos/DMatrimonios');

const obtenerMatrimonios = (callback) => {
    DMatrimonios.obtenerMatrimonios((error, matrimonios) => {
        if (error) {
            console.log('Error al obtener los bautizos:', error);
            callback(error, null);
            return;
        } else {
            matrimonios.forEach(matrimonio => {
                matrimonio.fecha = formatoFecha(matrimonio.fecha); 
            });
            callback(null, matrimonios);
        }
    });
}

const registrarMatrimonio = (req,res, callback)=>{
    nuevoMatrimonio = {
        fecha: req.body.fecha,
        novio_id: req.body.novio_id,
        novia_id: req.body.novia_id
    };
    DMatrimonios.registrarMatrimonio(nuevoMatrimonio, callback);
}

const eliminarMatrimonio = (req,res, callback) =>{
    idMatrimonio = req.body.id;
    DMatrimonios.eliminarMatrimonio(idMatrimonio, callback);
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
    obtenerMatrimonios: obtenerMatrimonios,
    eliminarMatrimonio: eliminarMatrimonio,
    registrarMatrimonio: registrarMatrimonio
}