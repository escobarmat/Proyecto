var express = require('express');
var router = express.Router();

/* GET disponible. */
router.get('/', function(req, res, next) {
  res.render('disponible',{
    isDisponible: true
});
});

module.exports = router;