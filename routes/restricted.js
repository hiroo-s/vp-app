var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.get('/', function(req, res, next) {
  let uuid = req.query.id;
  if (!uuid || !req.app.locals.verified[uuid]) {
    res.redirect('/');
    return;
  }

  param = {'name': req.app.locals.verified[uuid].name};
  
  res.render('index', param);
});

module.exports = router;