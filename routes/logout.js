var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  let uuid = req.query.id;
  if (uuid && req.app.locals.verified[uuid]) {
    delete req.app.locals.verified[uuid];
  }  
  res.redirect('/');  
});

module.exports = router;