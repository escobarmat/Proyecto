var express = require('express');
var router = express.Router();

/* GET empedrado. */
router.get('/', function(req, res, next) {
  res.render('empedrado',{
      isEmpedrado: true
  });
});

module.exports = router;