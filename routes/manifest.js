var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
let didJWT = require('did-jwt');
let conf = require('./const.js');


router.get('/:uuid', function(req, res, next) {
    let now = Math.floor(new Date().getTime() / 1000);
    let jtiUUID = uuidv4();
    let stateUUID = uuidv4();
    let vpUUID = uuidv4();
    let nonce = Buffer.from(Array(16).fill(0).map(x => Math.floor(Math.random() * 255))).toString('base64');

    let signer = didJWT.ES256KSigner('f471b9e951eadedcf2de47a574bc76c9d5f85bd4c485423ff0e9c61f8d5b5d42');

    let payload = {
        "id": "NGUxY2VjZDEtYzc2Ni00NzY3LWI2MTgtZDhjNjQ1MTM2MmNmdmVyaWZpZWRjcmVkZW50aWFsZXhhbXBsZQ",
        "display": {
          "locale": "en-US",
          "contract": "https://vp-app.azurewebsites.net/manifest/" + req.params.uuid,
          "card": {
            "title": "姓名クレデンシャル",
            "issuedBy": "https://vp-app.azurewebsites.net/",
            "backgroundColor": "#415d9c",
            "textColor": "#ffffff",
            "logo": {
              "uri": "https://zkp-ld-entra-sample.azurewebsites.net/businesscard.png",
              "description": "logo"
            },
            "description": "姓名だけを含むシンプルなクレデンシャル"
          },
          "consent": {
            "title": "Verifiable Credential の例",
            "instructions": "同意をお願いします"
          },
          "claims": {
            "vc.credentialSubject.http://schema.org/givenName": {
              "type": "String",
              "label": "名"
            },
            "vc.credentialSubject.http://schema.org/familyName": {
              "type": "String",
              "label": "姓"
            }
          },
          "id": "display"
        },
        "input": {
          "credentialIssuer": "https://vp-app.azurewebsites.net/issue/" + req.params.uuid,
          "issuer": conf.did,
          "attestations": {
            "idTokens": [
              {
                "id": "https://self-issued.me",
                "encrypted": false,
                "claims": [
                  {
                    "claim": "$.given_name",
                    "required": false,
                    "indexed": false
                  },
                  {
                    "claim": "$.family_name",
                    "required": false,
                    "indexed": true
                  }
                ],
                "required": false,
                "configuration": "https://self-issued.me",
                "client_id": "",
                "issuers": [],
                "redirect_uri": ""
              }
            ]
          },
          "id": "input"
        },
        "iss": conf.did,
        "iat": now
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
        res.send('{"token":"' + responseMessage + '"}');
    });
});

module.exports = router;
