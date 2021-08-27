var express = require('express');
var router = express.Router();
var disponibleModel = require('./../../models/disponibleModel')

router.get('/', async function (req, res, next) {
    // var disponible = await disponibleModel.getDisponible();
    var disponible
    if (req.query.q === undefined) {
        disponible = await disponibleModel.getDisponible();
    } else {
        disponible = await disponibleModel.buscarDisponible(req.query.q);
    }
    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        disponible,
        is_search: req.query.q !== undefined,
        q: req.query.q
    });
});

router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await disponibleModel.deleteDisponibleById(id);
    res.redirect('/admin/novedades')
});

router.get('/agregar', function (req, res, next) {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    });
});

router.post('/agregar', async (req, res) => {
    try {
        if (req.body.año != "" && req.body.mes != "" && req.body.fechas != "") {
            await disponibleModel.insertDisponible(req.body);
            res.redirect('/admin/novedades')
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true, messaje: 'Todos los campos son Requeridos'
            });
        }
    } catch (error) {
        console.log(error);
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true, messaje: 'No se Cargo La Novedad'
        })
    }
});

router.get('/modificar/:id', async (req, res, next) => {
    let id = req.params.id;
    let disponible = await disponibleModel.getDisponibleById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        disponible
    });
});

router.post('/modificar', async (req, res, next) => {
    try {
        let obj = {
            año: req.body.año,
            mes: req.body.mes,
            fechas: req.body.fechas
        }
        await disponibleModel.modificarDisponibleById(obj, req.body.id);
        res.redirect('/admin/novedades');
    } catch (error) {
        console.log(error);
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true, message: 'No se modifico la Novedad'
        })
    }
})
module.exports = router;