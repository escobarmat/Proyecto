var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

/* GET contacto. */
router.get('/', function(req, res, next) {
  res.render('contacto',{
    isContacto: true
});
});

router.post('/', async (req, res, next) => {
  
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var tel = req.body.tel;
  var email = req.body.email;
  var comentario = req.body.comentario;
  var obj = {
    to: 'escobar_matias92@gmail.com',
    from: 'DUPLEX FLAMA',
    subject: 'CONTACTO WEB',
    html: nombre + ' ' + apellido + " Se contacto a travez de la web y quiere informacion al siguiente email: " + email + ".<br> Hizo este comentario: " + comentario + ".<br>Y dejo su telefono: "+ tel
  }
  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  var info = await transport.sendMail(obj);

  res.render('contacto', {
  message:'El Mensaje se Envio Correctamente'
  });
});


module.exports = router;