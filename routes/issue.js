var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
let didJWT = require("did-jwt");

const did = 'did:ion:EiC9ObIXfBMX-sZTMluX2s1mt54bXyUNpfeBq5UKPrcjRQ:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJhdXRoLWtleSIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJqRFlYMkpFbXBrTmR3cHpnVndKYjhwNEpXY3BuNGpPQ2hBZW5ZZ3JTTndnIiwieSI6ImRTQUFkOVlob09jXzdfUUZtZFNON3VsQ29Qb3NNcGZ4YVlFVUppcndESGcifSwicHVycG9zZXMiOlsiYXV0aGVudGljYXRpb24iLCJrZXlBZ3JlZW1lbnQiXSwidHlwZSI6IkVjZHNhU2VjcDI1NmsxVmVyaWZpY2F0aW9uS2V5MjAxOSJ9XX19XSwidXBkYXRlQ29tbWl0bWVudCI6IkVpRGhWcC14RnhRaEZ2TWtubUVzYnVCZC0xenJsMlpNTGpQd0p1NzNVNUNQTkEifSwic3VmZml4RGF0YSI6eyJkZWx0YUhhc2giOiJFaUFROE9MbWxCcmotRS1hZDZWcDZvZF9DcDQ4Z2JsWnFHdEV0VjJ3YXZPQ1VnIiwicmVjb3ZlcnlDb21taXRtZW50IjoiRWlEcjEzMUx2Mzl1QTJoSE0xY2U3VWtaTTJMUEVtblRsNjZxQWw2TWFadXkydyJ9fQ';


/* GET users listing. */
router.get('/:uuid', function(req, res, next) {
    let now = Math.floor(new Date().getTime() / 1000);
    let walletDID = 'did:ion:EiDvsqPsDnRzQFgcfN_txrBMR6MY5jJAVkX2uzNvIS8WDw:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJzaWduX0c4QnpsbjlNSlAiLCJwdWJsaWNLZXlKd2siOnsiYWxnIjoiRVMyNTZLIiwiY3J2Ijoic2VjcDI1NmsxIiwia2V5X29wcyI6WyJ2ZXJpZnkiXSwia2lkIjoic2lnbl9HOEJ6bG45TUpQIiwia3R5IjoiRUMiLCJ1c2UiOiJzaWciLCJ4Ijoid0tTXy1DUVU0Q3VfdWhTZHItY25xeWQ1WE5LMGlmcmZOZ3RJM3dCQUozZyIsInkiOiIyVUdEa05STW5yZ25vNkdhMnJoa1B1SF9OVHd4eG5fWGJPRGJQNG94NmRZIn0sInB1cnBvc2VzIjpbImF1dGhlbnRpY2F0aW9uIl0sInR5cGUiOiJFY2RzYVNlY3AyNTZrMVZlcmlmaWNhdGlvbktleTIwMTkifV0sInNlcnZpY2VzIjpbXX19XSwidXBkYXRlQ29tbWl0bWVudCI6IkVpQ0hqemJTc2V0MU5ic182cThPVWJMUjYxQ3pWbFJYTVAxS19aNElmS0tJWWcifSwic3VmZml4RGF0YSI6eyJkZWx0YUhhc2giOiJFaUNkU1FFZ0IxWmROeXJmSUFvU3BPbGplYmFxaUY2N1Y3bmprek01WFBSTVlBIiwicmVjb3ZlcnlDb21taXRtZW50IjoiRWlDSzhkdFl3ZGpQMk5UU051djJBN3hiUG4xQTdGSC0zazc1cTdCNFBoeWZnQSJ9fQ#sign_G8Bzln9MJP';
    let stateUUID = uuidv4();
    let vpUUID = uuidv4();
    let nonce = Buffer.from(Array(16).fill(0).map(x => Math.floor(Math.random() * 255))).toString('base64');

    let signer = didJWT.ES256KSigner('f471b9e951eadedcf2de47a574bc76c9d5f85bd4c485423ff0e9c61f8d5b5d42');

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
              "http://schema.org/givenName": "given",
              "http://schema.org/familyName": "family"
            },
            credentialStatus: {
              "id": "urn:uuid:73b01ff5-f67d-4d43-8fbb-7be3f29bae43?bit-index=54",
              "type": "RevocationList2021Status",
              "statusListIndex": 54
            }
          },
          "jti": "urn:pic:f6c90a9ae07d41b386cec5728f50f3a1",
          "iss": did,
          "sub": walletDID,
          "iat": now,
          "exp": now + 30*24*60*60
    }

    let jwt = (async () => {
        let jwt = await didJWT.createJWT(
            payload,
            { issuer: did, signer },
            { alg: 'ES256K', kid: did + '#auth-key' }
        )
        return jwt;
    });

    jwt().then(responseMessage => {
        res.set('Content-Type', 'application/jwt');
        res.send(responseMessage);
    });
});

module.exports = router;
