const express = require('express')
const router = express.Router()
const path = require('path')

//IMPORTACIONES DEL NEGOCIO
const negocioMiembros = require('../negocio/NMiembros');
const negocioBautizos = require('../negocio/NBautizos');
const negocioMatrimonios = require('../negocio/NMatrimonio');
const negocioCargos = require('../negocio/NCargos');
const negocioMinisterios = require('../negocio/NMinisterio');
const negocioRelaciones = require('../negocio/NRelaciones');
const negocioParentesco = require('../negocio/NParentesco');

//ENRUTAMIENTO DE VISTAS 
router.get('/', (req, res)=>{
    res.render('welcomePage', { error: null });
});

//============================== MIEMBROS =================================
router.get('/PMiembros',(req, res)=>{
    negocioMiembros.obtenerMiembros((error, miembros)=>{
        if (error){
            return res.render('PMiembros', { NMiembros: [], error: 'Error al obtener los miembros' });
        }
        res.render('PMiembros',{NMiembros: miembros, error: null});
    });
});

//ENRUTAMIENTO DE METODOS Y ACCIONES
router.post('/NMiembros', (req,res)=>{
    const datosMiembro = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        sexo: req.body.sexo,
        fecha_nacimiento: req.body.fecha_nacimiento,
        estado_civil: req.body.estado_civil,
        ci: req.body.ci,
        domicilio: req.body.domicilio,
        celular: req.body.celular
    };
    
    negocioMiembros.registrarMiembro(datosMiembro, (error)=>{
        if(error){
            return res.status(500).send('Error al registrar el miembro');
        }   
        return res.redirect('/PMiembros');
    });
});

router.post('/eliminarMiembro', (req,res)=>{
    const idMiembro = req.body.id;
    
    negocioMiembros.eliminarMiembro(idMiembro, (error)=>{
        if(error){
            return res.status(500).send('Error al eliminar el miembro');
        }   
        return res.redirect('/PMiembros');
    });
});

//============================== BAUTIZOS =================================

router.get('/PBautizos', (req, res) => {
    negocioBautizos.obtenerBautizos((error, bautizos) => {
        if (error) {
            return res.render('PBautizos', { bautizos: [], personas: [], error: 'Error al obtener los bautizos' });
        }
        
        negocioMiembros.obtenerMiembros((error, miembros) => {
            if (error){
                return res.render('PBautizos', { bautizos: bautizos || [], personas: [], error: 'Error al obtener los miembros' });
            }
            
            // Aseguramos que bautizos y miembros sean arrays válidos
            const bautizosArray = Array.isArray(bautizos) ? bautizos : [];
            const miembrosArray = Array.isArray(miembros) ? miembros : [];
            
            for (let i = 0; i < bautizosArray.length; i++) {
                const bautizo = bautizosArray[i];
                for (let j = 0; j < miembrosArray.length; j++) {
                    const miembro = miembrosArray[j];
                    if (miembro.id === bautizo.miembro_id) {
                        bautizo.nombreMiembro = miembro.nombres;
                        break;
                    }
                }
            }   
            
            res.render('PBautizos', { bautizos: bautizosArray, personas: miembrosArray, error: null });
        });
    });
});

router.post('/NBautizos', (req,res)=>{
    const datosBautizo = {
        fecha: req.body.fecha,
        miembro_id: req.body.miembro_id
    };
    
    negocioBautizos.registrarBautizo(datosBautizo, (error)=>{
        if(error){
            return res.status(500).send('Error al registrar el bautizo');
        }   
        return res.redirect('/PBautizos');
    });
});

router.post('/eliminarBautizo', (req,res)=>{
    const idBautizo = req.body.id;
    
    negocioBautizos.eliminarBautizo(idBautizo, (error)=>{
        if(error){
            return res.status(500).send('Error al eliminar el bautizo');
        }
        return res.redirect('/PBautizos');
    });
});

//============================== MATRIMONIOS =================================

router.get('/PMatrimonios', (req, res) => {
    negocioMatrimonios.obtenerMatrimonios((error, matrimonios) => {
        if (error) {
            return res.render('PMatrimonios', { matrimonios: [], hombres: [], mujeres: [], error: 'Error al obtener los matrimonios' });
        }
        
        const matrimoniosArray = Array.isArray(matrimonios) ? matrimonios : [];
        
        matrimoniosArray.forEach((matrimonio, index) => {
            negocioMiembros.obtenerNombre(matrimonio.novio_id, (error, nombreNovio) => {
                if (error) {
                    matrimoniosArray[index].nombreNovio = 'Desconocido';
                } else {
                    matrimoniosArray[index].nombreNovio = nombreNovio;
                }

                negocioMiembros.obtenerNombre(matrimonio.novia_id, (error, nombreNovia) => {
                    if (error) {
                        matrimoniosArray[index].nombreNovia = 'Desconocido';
                    } else {
                        matrimoniosArray[index].nombreNovia = nombreNovia;
                    }
                });
            });
        });
        
        negocioMiembros.obtenerHombres((error, hombres) => {
            const hombresArray = error ? [] : (Array.isArray(hombres) ? hombres : []);
            
            if (error){
                console.error('Error al obtener los hombres:', error);
            }
            
            negocioMiembros.obtenerMujeres((error, mujeres) => {
                const mujeresArray = error ? [] : (Array.isArray(mujeres) ? mujeres : []);
                
                if(error){
                    console.error('Error al obtener las mujeres:', error);
                }
                
                res.render('PMatrimonios', { 
                    matrimonios: matrimoniosArray, 
                    hombres: hombresArray, 
                    mujeres: mujeresArray,
                    error: null
                });
            });
        });  
    });
});

router.post('/NMatrimonios', (req,res)=>{
    const datosMatrimonio = {
        fecha: req.body.fecha,
        novio_id: req.body.novio_id,
        novia_id: req.body.novia_id
    };
    
    negocioMatrimonios.registrarMatrimonio(datosMatrimonio, (error)=>{
        if(error){
            return res.status(500).send('Error al registrar el matrimonio');
        }   
        return res.redirect('/PMatrimonios');
    });
});

router.post('/eliminarMatrimonio', (req,res)=>{
    const idMatrimonio = req.body.id;
    
    negocioMatrimonios.eliminarMatrimonio(idMatrimonio, (error)=>{
        if(error){
            return res.status(500).send('Error al eliminar el matrimonio');
        }   
        return res.redirect('/PMatrimonios');
    });
});

//============================== CARGOS  =================================

router.get('/PCargos',(req, res)=>{
    negocioCargos.obtenerCargos((error,cargos)=>{
        if (error){
            return res.render('PCargos', {cargos: [], miembros: [], ministerios: [], error: 'Error al obtener los cargos'});
        }
        
        const cargosArray = Array.isArray(cargos) ? cargos : [];
        
        cargosArray.forEach((cargo, index) => {
            negocioMiembros.obtenerNombre(cargo.miembro_id, (error, nombre) => {
                if (error) {
                    cargosArray[index].nombreMiembro = 'Desconocido';
                } else {
                    cargosArray[index].nombreMiembro = nombre;
                }
            });
        });
        
        cargosArray.forEach((cargo, index) => {
            negocioMinisterios.obtenerMinisterio(cargo.ministerio_id, (error, ministerio) => {
                if (error) {
                    cargosArray[index].nombreMinisterio = 'Desconocido';
                } else {
                    cargosArray[index].nombreMinisterio = ministerio;
                }
            });
        });

        negocioMiembros.obtenerMiembros((error,miembros)=>{
            const miembrosArray = error ? [] : (Array.isArray(miembros) ? miembros : []);
            
            if (error){
                console.error('Error al obtener los miembros:', error);
            }
            
            negocioMinisterios.obtenerMinisterios((error,ministerios)=>{
                const ministeriosArray = error ? [] : (Array.isArray(ministerios) ? ministerios : []);
                
                if(error){
                    console.error('Error al obtener los ministerios:', error);
                }
                
                res.render('PCargos', {
                    cargos: cargosArray, 
                    miembros: miembrosArray, 
                    ministerios: ministeriosArray,
                    error: null
                });
            });
        });
    });
});

router.post('/NCargos', (req,res)=>{
    const datosCargo = {
        miembro_id: req.body.miembro_id,
        ministerio_id: req.body.ministerio_id
    };
    
    negocioCargos.registrarCargo(datosCargo, (error)=>{
        if(error){
            return res.status(500).send('Error al registrar el cargo');
        }   
        return res.redirect('/PCargos');
    });
});

router.post('/darDeBaja', (req,res)=>{
    const idCargo = req.body.id;
    
    negocioCargos.darDeBaja(idCargo, (error)=>{
        if(error){
            return res.status(500).send('Error al dar de baja el cargo');
        }   
        return res.redirect('/PCargos');
    });
});

//============================== RELACIONES =================================

router.get('/PRelaciones',(req,res)=>{
    negocioRelaciones.obtenerRelaciones((error,relaciones)=>{
        if (error){
            return res.render('PRelaciones', {relaciones: [], miembros: [], parentescos: [], error: 'Error al obtener las relaciones'});
        }
        
        const relacionesArray = Array.isArray(relaciones) ? relaciones : [];
        
        relacionesArray.forEach((relacion) => {
            negocioMiembros.obtenerNombre(relacion.primer_miembro_id, (error, nombre) => {
                if (error) {
                    relacion.nombrePrimerMiembro = 'Desconocido';
                } else {
                    relacion.nombrePrimerMiembro = nombre;
                }
            });
        });

        relacionesArray.forEach((relacion) => {
            negocioMiembros.obtenerNombre(relacion.segundo_miembro_id, (error, nombre) => {
                if (error) {
                    relacion.nombreSegundoMiembro = 'Desconocido';
                } else {
                    relacion.nombreSegundoMiembro = nombre;
                }
            });
        });

        relacionesArray.forEach((relacion) => {
            negocioParentesco.obtenerParentesco(relacion.parentesco_id, (error, parentesco) => {
                if (error) {
                    relacion.tipoParentesco = 'Desconocido';
                } else {
                    relacion.tipoParentesco = parentesco;
                }
            });
        });

        negocioMiembros.obtenerMiembros((error,miembros)=>{
            const miembrosArray = error ? [] : (Array.isArray(miembros) ? miembros : []);
            
            if (error){
                console.error('Error al obtener los miembros:', error);
            }
            
            negocioParentesco.obtenerParentescos((error,parentescos)=>{
                const parentescosArray = error ? [] : (Array.isArray(parentescos) ? parentescos : []);
                
                if(error){
                    console.error('Error al obtener los parentescos:', error);
                }
                
                res.render('PRelaciones', {
                    relaciones: relacionesArray, 
                    miembros: miembrosArray, 
                    parentescos: parentescosArray,
                    error: null
                });
            });
        });
    });
});

router.post('/NRelaciones', (req,res)=>{
    const datosRelacion = {
        primer_miembro_id: req.body.primer_miembro_id,
        segundo_miembro_id: req.body.segundo_miembro_id,
        parentesco_id: req.body.parentesco_id
    };
    
    negocioRelaciones.registrarRelacion(datosRelacion, (error)=>{
        if(error){
            return res.status(500).send('Error al registrar la relación');
        }
        return res.redirect('/PRelaciones');
    });
});

module.exports = router