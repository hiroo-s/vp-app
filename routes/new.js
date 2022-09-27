var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

/* GET issue page. */
router.get('/', function(req, res, next) {
  param = {'uuid': uuidv4()};
  res.render('new', param);
});

module.exports = router;