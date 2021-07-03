var express = require('express');
var router = express.Router();

/* GET propiedad. */
router.get('/', function(req, res, next) {
  res.render('propiedad',{
    isPropiedad: true
});
});

module.exports = router;