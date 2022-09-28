var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
let didJWT = require('did-jwt');
let conf = require('./const.js');


router.post('/', function(req, res, next) {
    let uuid = req.body.uuid;

    req.app.locals.request[uuid] = {
        family_name: req.body.family_name,
        given_name: req.body.given_name
    }

    res.set('Content-Type', 'text/plain');
    res.send('OK');
});

router.post('/:uuid', function(req, res, next) {
    let now = Math.floor(new Date().getTime() / 1000);
    let walletDID = 'did:ion:EiDvsqPsDnRzQFgcfN_txrBMR6MY5jJAVkX2uzNvIS8WDw:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJzaWduX0c4QnpsbjlNSlAiLCJwdWJsaWNLZXlKd2siOnsiYWxnIjoiRVMyNTZLIiwiY3J2Ijoic2VjcDI1NmsxIiwia2V5X29wcyI6WyJ2ZXJpZnkiXSwia2lkIjoic2lnbl9HOEJ6bG45TUpQIiwia3R5IjoiRUMiLCJ1c2UiOiJzaWciLCJ4Ijoid0tTXy1DUVU0Q3VfdWhTZHItY25xeWQ1WE5LMGlmcmZOZ3RJM3dCQUozZyIsInkiOiIyVUdEa05STW5yZ25vNkdhMnJoa1B1SF9OVHd4eG5fWGJPRGJQNG94NmRZIn0sInB1cnBvc2VzIjpbImF1dGhlbnRpY2F0aW9uIl0sInR5cGUiOiJFY2RzYVNlY3AyNTZrMVZlcmlmaWNhdGlvbktleTIwMTkifV0sInNlcnZpY2VzIjpbXX19XSwidXBkYXRlQ29tbWl0bWVudCI6IkVpQ0hqemJTc2V0MU5ic182cThPVWJMUjYxQ3pWbFJYTVAxS19aNElmS0tJWWcifSwic3VmZml4RGF0YSI6eyJkZWx0YUhhc2giOiJFaUNkU1FFZ0IxWmROeXJmSUFvU3BPbGplYmFxaUY2N1Y3bmprek01WFBSTVlBIiwicmVjb3ZlcnlDb21taXRtZW50IjoiRWlDSzhkdFl3ZGpQMk5UU051djJBN3hiUG4xQTdGSC0zazc1cTdCNFBoeWZnQSJ9fQ#sign_G8Bzln9MJP';
    let uuid = req.params.uuid;
    let stateUUID = uuidv4();
    let vpUUID = uuidv4();
    let nonce = Buffer.from(Array(16).fill(0).map(x => Math.floor(Math.random() * 255))).toString('base64');
    let data = req.app.locals.request[uuid];
    delete req.app.locals.request[uuid]

    let payload = {
        "vc": {
            "@context": [
              "https://www.w3.org/2018/credentials/v1"
            ],
            type: [
              "VerifiableCredential",
              "https://zkp-ld.org/NameCredential"
            ],
            credentialSubject: {
              "http://schema.org/givenName": data.given_name,
              "http://schema.org/familyName": data.family_name
            },
            credentialStatus: {
              "id": "urn:uuid:73b01ff5-f67d-4d43-8fbb-7be3f29bae43?bit-index=54",
              "type": "RevocationList2021Status",
              "statusListIndex": 54
            }
          },
          "jti": "urn:pic:f6c90a9ae07d41b386cec5728f50f3a1",
          "iss": conf.did,
          "sub": walletDID,
          "iat": now,
          "exp": now + 30*24*60*60
    }

    let jwt = (async () => {
        let jwt = await didJWT.createJWT(
            payload,
            { issuer: conf.did, signer: conf.signer },
            { alg: 'ES256K', kid: conf.did + '#auth-key' }
        )
        return jwt;
    });

    jwt().then(responseMessage => {
        res.set('Content-Type', 'application/json');
        res.send('{"vc":"' + responseMessage + '"}');
    });
});

module.exports = router;
