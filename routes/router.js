const express = require('express')
const router = express.Router()
const path = require('path')

//IMPORTACIONES DEL NEGOCIO
const NegocioMiembro = require('../negocio/NMiembros');
const NegocioBautizo = require('../negocio/NBautizos');
const NegocioMatrimonio = require('../negocio/NMatrimonio');
const NegocioCargo = require('../negocio/NCargos');
const NegocioMinisterio = require('../negocio/NMinisterio');
//ENRUTAMIENTO DE VISTAS 
router.get('/', (req, res)=>{
    res.render('welcomePage');
});

//============================== MIEMBROS =================================
router.get('/PMiembros',(req, res)=>{
    NegocioMiembro.obtenerMiembros((error,miembros)=>{
        if (error){
            return res.status(500).send('Error al obtener los miembros');
        }
        res.render('PMiembros',{miembros: miembros});
    });
});

//ENRUTAMIENTO DE METODOS Y ACCIONES
router.post('/NMiembros', (req,res)=>{
    NegocioMiembro.registrarMiembro(req,res,(error)=>{
        if(error){
            return res.status(500).send('Error al registrar el miembro');
        }   
    });
    res.redirect('/PMiembros');
});

router.post('/eliminarMiembro', (req,res)=>{
    NegocioMiembro.eliminarMiembro(req,res,(error)=>{
        if(error){
            return res.status(500).send('Error al eliminar el miembro');
        }   
    })
    res.redirect('/PMiembros');
});

//============================== BAUTIZOS =================================

router.get('/PBautizos', (req, res) => {
    NegocioBautizo.obtenerBautizos((error, bautizos) => {
        if (error) {
            res.status(500).send('Error al obtener los bautizos');
            return;
        }
        NegocioMiembro.obtenerMiembros((error,miembros)=>{
            if (error){
                return res.status(500).send('Error al obtener los miembros');
            }
            for (let i = 0; i < bautizos.length; i++) {
                const bautizo = bautizos[i];
                for (let j = 0; j < miembros.length; j++) {
                    const miembro = miembros[j];
                    if (miembro.id === bautizo.miembro_id) {
                        bautizo.nombreMiembro = miembro.nombres;
                        break;
                    }
                }
            }   
            res.render('PBautizos', { bautizos: bautizos, personas: miembros});
            
        });
        
    });
});

router.post('/NBautizos', (req,res)=>{
    NegocioBautizo.registrarBautizo(req,res,(error)=>{
        if(error){
            return res.status(500).send('Error al registrar el bautizo');
        }   
    });
    res.redirect('/PBautizos');
});

router.post('/eliminarBautizo', (req,res)=>{
    NegocioBautizo.eliminarBautizo(req,res,(error)=>{
        if(error){
            return res.status(500).send('Error al eliminar el bautizo');
        }
    })
    res.redirect('/PBautizos');
});

//============================== MATRIMONIOS =================================

router.get('/PMatrimonios', (req, res) => {
    NegocioMatrimonio.obtenerMatrimonios((error, matrimonios) => {
        if (error) {
            res.status(500).send('Error al obtener los matrimonios');
            return;
        }
        matrimonios.forEach((matrimonio, index) => {
            NegocioMiembro.obtenerNombre(matrimonio.novio_id, (error, nombreNovio) => {
                if (error) {
                    res.status(500).send('Error al obtener el nombre del novio');
                    return;
                }
                matrimonios[index].nombreNovio = nombreNovio;

                NegocioMiembro.obtenerNombre(matrimonio.novia_id, (error, nombreNovia) => {
                    if (error) {
                        res.status(500).send('Error al obtener el nombre del novio');
                        return;
                    }
                    matrimonios[index].nombreNovia = nombreNovia;
                });
            });
        });
        NegocioMiembro.obtenerHombres((error,hombres)=>{
            if (error){
                return res.status(500).send('Error al obtener los hombres');
            }
            NegocioMiembro.obtenerMujeres((error, mujeres)=>{
                if(error){
                    return res.status(500).send('Error al obtener los miembros');
                }
                res.render('PMatrimonios', { matrimonios: matrimonios, hombres: hombres, mujeres: mujeres});
            });
        });  
    });
});

router.post('/NMatrimonios', (req,res)=>{
    NegocioMatrimonio.registrarMatrimonio(req,res,(error)=>{
        if(error){
            return res.status(500).send('Error al registrar el matrimonio');
        }   
    });
    res.redirect('/PMatrimonios');
});

router.post('/eliminarMatrimonio', (req,res)=>{
    NegocioMatrimonio.eliminarMatrimonio(req,res,(error)=>{
        if(error){
            return res.status(500).send('Error al eliminar el matrimonio');
        }   
    })
    res.redirect('/PMatrimonios');
});

//============================== CARGOS  =================================

router.get('/PCargos',(req, res)=>{
    NegocioCargo.obtenerCargos((error,cargos)=>{
        if (error){
            return res.status(500).send('Error al obtener los miembros');
        }
        cargos.forEach((cargo, index) => {
            NegocioMiembro.obtenerNombre(cargo.miembro_id, (error, nombre) => {
                if (error) {
                    res.status(500).send('Error al obtener el nombre de los miembros');
                    return;
                }
                cargos[index].nombreMiembro = nombre;
            });
        })
        
        cargos.forEach((cargo, index) => {
            NegocioMinisterio.obtenerMinisterio(cargo.ministerio_id, (error, ministerio) => {
                if (error) {
                    res.status(500).send('Error al obtener el nombre de los ministerios');
                    return;
                }
                cargos[index].nombreMinisterio = ministerio;
            });
        })

        NegocioMiembro.obtenerMiembros((error,miembros)=>{
            if (error){
                return res.status(500).send('Error al obtener los miembros');
            }
            NegocioMinisterio.obtenerMinisterios((error,ministerios)=>{
                if(error){
                    return res.status(500).send('Error al obtener los ministerios');
                }
                res.render('PCargos', {cargos: cargos, miembros: miembros, ministerios: ministerios});
            })
        });
    });
});

router.post('/NCargos', (req,res)=>{
    NegocioCargo.registrarCargo(req,res,(error)=>{
        if(error){
            return res.status(500).send('Error al registrar el cargo');
        }   
    });
    res.redirect('/PCargos');
});

router.post('/darDeBaja', (req,res)=>{
    NegocioCargo.darDeBaja(req,res,(error)=>{
        if(error){
            return res.status(500).send('Error al dar de baja el cargo');
        }   
    })
    res.redirect('/PCargos');
});

module.exports = router