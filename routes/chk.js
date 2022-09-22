var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  let uuid = req.params.id;
  console.log(uuid);  
  console.log(req.app.locals.verified[uuid]);

  if (!uuid || !req.app.locals.verified[uuid]) {
    res.send('NG');
    return;
  }

  res.send('OK');
});

module.exports = router;