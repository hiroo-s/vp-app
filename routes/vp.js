let didJWT = require("did-jwt");
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('VP');
});

module.exports = router;
