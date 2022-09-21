var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/did.json', function(req, res, next) {
  res.render('did.json');
});

module.exports = router;