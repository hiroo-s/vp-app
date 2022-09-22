var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.get('/set', function(req, res, next) {
  let uuid = req.query.id;
  if (uuid) {
    req.app.locals.verified[uuid] = {'name': 'hogehoge'}
  }
  res.send("OK");
});

router.get('/get', function(req, res, next) {
    res.send(JSON.stringify(req.app.locals.verified));
  });

module.exports = router;