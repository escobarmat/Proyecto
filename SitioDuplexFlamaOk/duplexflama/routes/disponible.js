var express = require('express');
var router = express.Router();
var disponibleModel = require('./../models/disponibleModel');

/* GET disponible. */
router.get('/',async function(req, res, next) {
  // var disponible = await disponibleModel.getDisponible();
  var disponible
  if(req.query.q===undefined){
      disponible = await disponibleModel.getDisponible();
  }else{
      disponible = await disponibleModel.buscarDisponible(req.query.q);
  }
  res.render('disponible',{
      isDisponible: true,
      disponible,
      is_search: req.query.q !==undefined,
      q: req.query.q
  });
});
module.exports = router;