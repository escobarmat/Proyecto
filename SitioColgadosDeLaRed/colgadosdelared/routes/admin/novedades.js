var express = require('express');
var router = express.Router();
var novedadesModel = require('./../../models/novedadesModel');
var cloudinary = require('cloudinary');
var fs = require('fs-extra');

router.get('/', async function (req, res, next) {
    // var novedades = await novedadesModel.getNovedades();
    var novedades
    if(req.query.q===undefined){
        novedades = await novedadesModel.getNovedades();
    }else{
        novedades = await novedadesModel.buscarNovedades(req.query.q);
    }
    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades,
        is_search: req.query.q !==undefined,
        q: req.query.q
    });
});

router.get('/eliminar/:id/:public_id', async (req, res, next) => {
    var id = req.params.id;
    var public_id = req.params.public_id;
    await novedadesModel.deleteNovedadesById(id);

    cloudinary.v2.uploader.destroy(public_id).then(function () {
        res.redirect('/admin/novedades');
    }).catch(function () {
        res.redirect('/admin/novedades');
    });
});

router.get('/agregar', function (req, res, next) {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    });
});

router.post('/agregar', async (req, res) => {
    try {
        if (req.file != undefined && req.body.titulo != "" && req.body.cuerpo != "") {
            console.log(req.file);
            var result = await cloudinary.v2.uploader.upload(req.file.path);
            console.log(result);
            await fs.unlink(req.file.path);
            var image_url = result.url;
            var public_id = result.public_id;
            var cuerpo = req.body.cuerpo;
            var titulo = req.body.titulo;
            var subir = { titulo, cuerpo, image_url, public_id };
            await novedadesModel.insertNovedades(subir);
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

    // var subido = true;
    // res.render('admin/agregar', {
    //     layout:'admin/layout',
    //     subido, image_url, public_id, cuerpo, titulo
    // });
});

router.get('/modificar/:id', async(req, res, next)=>{
    let id = req.params.id;
    let novedad = await novedadesModel.getNovedadById(id);
    res.render('admin/modificar',{
        layout:'admin/layout',
        novedad
    });
});

router.post('/modificar', async (req, res, next) => {
    if (req.file != undefined) {
        var public = req.body.public_id;
        cloudinary.v2.uploader.destroy(public).then(function () {
        }).catch(function () {
        });
        var result = await cloudinary.v2.uploader.upload(req.file.path);
        await fs.unlink(req.file.path);
        var image_url = result.url;
        var public_id = result.public_id;
    } else {
        var image_url = req.body.image_url;
        var public_id = req.body.public_id;
    }
    try {
        let obj = {
            titulo: req.body.titulo,
            cuerpo: req.body.cuerpo,
            public_id: public_id,
            image_url: image_url
        }
        await novedadesModel.modificarNovedadesById(obj, req.body.id);
        res.redirect('/admin/novedades');
    } catch (error) {
        console.log(error);
        res.render('admin/modificar', {
            layout:'admin/layout',
            error: true, message: 'No se modifico la Novedad'
        })
    }
})

module.exports = router;