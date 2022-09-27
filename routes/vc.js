var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
let didJWT = require("did-jwt");

const did = 'did:ion:EiC9ObIXfBMX-sZTMluX2s1mt54bXyUNpfeBq5UKPrcjRQ:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJhdXRoLWtleSIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJqRFlYMkpFbXBrTmR3cHpnVndKYjhwNEpXY3BuNGpPQ2hBZW5ZZ3JTTndnIiwieSI6ImRTQUFkOVlob09jXzdfUUZtZFNON3VsQ29Qb3NNcGZ4YVlFVUppcndESGcifSwicHVycG9zZXMiOlsiYXV0aGVudGljYXRpb24iLCJrZXlBZ3JlZW1lbnQiXSwidHlwZSI6IkVjZHNhU2VjcDI1NmsxVmVyaWZpY2F0aW9uS2V5MjAxOSJ9XX19XSwidXBkYXRlQ29tbWl0bWVudCI6IkVpRGhWcC14RnhRaEZ2TWtubUVzYnVCZC0xenJsMlpNTGpQd0p1NzNVNUNQTkEifSwic3VmZml4RGF0YSI6eyJkZWx0YUhhc2giOiJFaUFROE9MbWxCcmotRS1hZDZWcDZvZF9DcDQ4Z2JsWnFHdEV0VjJ3YXZPQ1VnIiwicmVjb3ZlcnlDb21taXRtZW50IjoiRWlEcjEzMUx2Mzl1QTJoSE0xY2U3VWtaTTJMUEVtblRsNjZxQWw2TWFadXkydyJ9fQ';


/* GET users listing. */
router.get('/:uuid', function(req, res, next) {
    let now = Math.floor(new Date().getTime() / 1000);
    let jtiUUID = uuidv4();
    let stateUUID = uuidv4();
    let vpUUID = uuidv4();
    let nonce = Buffer.from(Array(16).fill(0).map(x => Math.floor(Math.random() * 255))).toString('base64');

    let signer = didJWT.ES256KSigner('f471b9e951eadedcf2de47a574bc76c9d5f85bd4c485423ff0e9c61f8d5b5d42');

    let payload = {
        jti: jtiUUID,
        iat: now,
        response_type: "id_token",
        response_mode: "post",
        scope: "openid",
        nonce: nonce,
        client_id: did,
        redirect_uri: "https://vp-app.azurewebsites.net/complete/" + req.query.uuid,
        prompt: "create",
        state: stateUUID,
        exp: now + 3000,
        registration: {
            client_name: "姓名クレデンシャル発行者",
            subject_syntax_types_supported: [
                "did:ion"
            ],
            vp_formats: {
                jwt_vp: {
                    alg: [
                        "ES256K"
                    ]
                },
                jwt_vc: {
                    alg: [
                        "ES256K"
                    ]
                }
            }
        },
        claims: {
            vp_token: {
                presentation_definition: {
                    id: vpUUID,
                    input_descriptors: [
                        {
                            id: "https://zkp-ld.org/NameCredential",
                            schema: [
                                {
                                    uri: "https://zkp-ld.org/NameCredential"
                                }
                            ],
                            issuance: [
                                {
                                    manifest: "https://vp-app.azurewebsites.net/manifest/" + req.query.uuid
                                }
                            ]
                        }
                    ]
                }
            }
        }
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
