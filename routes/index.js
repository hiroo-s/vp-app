var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.app.locals.vpResult);
  param = {'name': req.app.locals.vpResult};
  res.render('index', param);
});

module.exports = router;
