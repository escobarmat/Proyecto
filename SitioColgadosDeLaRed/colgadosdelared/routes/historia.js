var express = require('express');
var router = express.Router();

/* GET historia. */
router.get('/', function(req, res, next) {
  res.render('historia',{
      isHistoria: true
  });
});

module.exports = router;