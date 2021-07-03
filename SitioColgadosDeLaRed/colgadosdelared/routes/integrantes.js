var express = require('express');
var router = express.Router();

/* GET integrantes. */
router.get('/', function(req, res, next) {
  res.render('integrantes',{
    isIntegrantes: true
});
});

module.exports = router;