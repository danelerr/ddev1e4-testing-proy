const express = require('express')
const router = express.Router()
const path = require('path')

//IMPORTACIONES DEL NEGOCIO
const NegocioMiembro = require('../negocio/NMiembros');
const NegocioBautizo = require('../negocio/NBautizos');
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

module.exports = router