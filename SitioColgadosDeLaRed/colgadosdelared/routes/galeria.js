var express = require('express');
var router = express.Router();

/* GET galeria. */
router.get('/', function(req, res, next) {
  res.render('galeria',{
    isGaleria: true
});
});

module.exports = router;