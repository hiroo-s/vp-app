var express = require('express');
var router = express.Router();
const didJWT = require('did-jwt');
const resolver = require('did-resolver');
const ION = require('@decentralized-identity/ion-tools');
const webResolver = require('web-did-resolver')
const conf = require('./const.js');


router.post('/:uuid', function(req, res, next) {
  let vpToken = req.body.vp_token;
  let uuid = req.params.uuid;

  let p = didJWT.verifyJWT(vpToken, {
    audience: conf.did,
    resolver: new resolver.Resolver({'ion': ION.resolve})
  });
  p.then(r => {
      let vc = r.payload.vp.verifiableCredential;

      let p = didJWT.verifyJWT(vc[0], {
        resolver: new resolver.Resolver({'ion': ION.resolve, ...webResolver.getResolver()})
      });
      p.then(r => {
        let sub = r.payload.vc.credentialSubject;
        req.app.locals.verified[uuid] = {
          name: sub["http://schema.org/familyName"] + " " + sub["http://schema.org/givenName"]
        }
        console.log('wrote req.app.locals.verified.' + uuid + ' = ' + req.app.locals.verified[uuid]);
      });
    });

  res.set('Content-Type', 'text/plain');
  res.send('OK');
});

module.exports = router;
