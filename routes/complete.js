var express = require('express');
var router = express.Router();

router.post('/:uuid', function(req, res, next) {
  let data = req.body;
  let uuid = req.params.uuid;
  console.log(data);

  res.set('Content-Type', 'text/plain');
  res.send('Accepted');
});

module.exports = router;
