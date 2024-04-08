const express = require('express')
const router = express.Router()
const path = require('path')

//IMPORTACIONES DEL NEGOCIO
const NegocioMiembro = require('../negocio/NMiembros');

//ENRUTAMIENTO DE VISTAS 
router.get('/', (req, res)=>{
    res.render('welcomePage');
});

router.get('/PMiembros',(req, res)=>{
    NegocioMiembro.obtenerMiembros((error,miembros)=>{
        if (error){
            return res.status(500).send('Error al obtener los miembros');
        }
        res.render('PMiembros',{miembros: miembros});
    })
})

//ENRUTAMIENTO DE METODOS Y ACCIONES
router.post('/NMiembros', (req,res)=>{
    NegocioMiembro.registrarMiembro(req,res,(error)=>{
        if(error){
            return res.status(500).send('Error al registrar el miembro');
        }   
    })
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

module.exports = router