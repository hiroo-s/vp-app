var express = require('express');
var router = express.Router();
const didJWT = require('did-jwt');
const resolver = require('did-resolver');
const ION = require('@decentralized-identity/ion-tools');
const webResolver = require('web-did-resolver')

router.post('/', function(req, res, next) {
  let vpToken = req.body.vp_token;

  let p = didJWT.verifyJWT(vpToken, {
    audience: 'did:web:zkp-ld.org',
    resolver: new resolver.Resolver({'ion': ION.resolve})
  });
  p.then(r => {
      let vc = r.payload.vp.verifiableCredential;

      let p = didJWT.verifyJWT(vc[0], {
        resolver: new resolver.Resolver({'ion': ION.resolve, ...webResolver.getResolver()})
      });
      p.then(r => {
        let sub = r.payload.vc.credentialSubject;
        console.log(sub);
      });
    });

  res.send('OK');
});

module.exports = router;
