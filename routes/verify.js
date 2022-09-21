var express = require('express');
var router = express.Router();
const didJWT = require('did-jwt');
const resolver = require('did-resolver');
const ION = require('@decentralized-identity/ion-tools');

router.post('/', function(req, res, next) {
  let vpToken = req.body.vp_token;
  console.log(vpToken);

  let p = didJWT.verifyJWT(vpToken, {
    skewTime: 5184000,
    audience: 'did:web:zkp-ld.org',
    resolver: new resolver.Resolver({'ion': ION.resolve})
  });
  p.then(r => {
      let jwt = r.jwt;
      console.log('jwt: ' + jwt);
      let p = didJWT.verifyJWT(jwt, {
        skewTime: 5184000,
        resolver: new resolver.Resolver({'ion': ION.resolve})
      });
      p.then(r => {console.log(r)})
    });

  res.send('OK');
});

module.exports = router;
