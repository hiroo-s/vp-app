var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  let uuid = req.params.id;

  if (!uuid || !req.app.locals.verified[uuid]) {
    req.app.locals.count++;
    res.send('NG');
    return;
  }

  res.send('OK');
});

module.exports = router;