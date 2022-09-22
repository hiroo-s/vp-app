var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

/* GET home page. */
router.get('/', function(req, res, next) {
  param = {'uuid': uuidv4()};
  res.render('index', param);
});

module.exports = router;
