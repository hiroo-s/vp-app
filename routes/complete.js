var express = require('express');
var router = express.Router();
const didJWT = require('did-jwt');
const resolver = require('did-resolver');
const ION = require('@decentralized-identity/ion-tools');
const webResolver = require('web-did-resolver')

const did = 'did:ion:EiC9ObIXfBMX-sZTMluX2s1mt54bXyUNpfeBq5UKPrcjRQ:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJhdXRoLWtleSIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJqRFlYMkpFbXBrTmR3cHpnVndKYjhwNEpXY3BuNGpPQ2hBZW5ZZ3JTTndnIiwieSI6ImRTQUFkOVlob09jXzdfUUZtZFNON3VsQ29Qb3NNcGZ4YVlFVUppcndESGcifSwicHVycG9zZXMiOlsiYXV0aGVudGljYXRpb24iLCJrZXlBZ3JlZW1lbnQiXSwidHlwZSI6IkVjZHNhU2VjcDI1NmsxVmVyaWZpY2F0aW9uS2V5MjAxOSJ9XX19XSwidXBkYXRlQ29tbWl0bWVudCI6IkVpRGhWcC14RnhRaEZ2TWtubUVzYnVCZC0xenJsMlpNTGpQd0p1NzNVNUNQTkEifSwic3VmZml4RGF0YSI6eyJkZWx0YUhhc2giOiJFaUFROE9MbWxCcmotRS1hZDZWcDZvZF9DcDQ4Z2JsWnFHdEV0VjJ3YXZPQ1VnIiwicmVjb3ZlcnlDb21taXRtZW50IjoiRWlEcjEzMUx2Mzl1QTJoSE0xY2U3VWtaTTJMUEVtblRsNjZxQWw2TWFadXkydyJ9fQ';

router.post('/:uuid', function(req, res, next) {
  let data = req.body;
  let uuid = req.params.uuid;
  console.log(data);

  res.set('Content-Type', 'text/plain');
  res.send('Accepted');
});

module.exports = router;