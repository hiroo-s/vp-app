let didJWT = require("did-jwt");
var express = require('express');
var router = express.Router();

const did = 'did:ion:EiC9ObIXfBMX-sZTMluX2s1mt54bXyUNpfeBq5UKPrcjRQ:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJhdXRoLWtleSIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJqRFlYMkpFbXBrTmR3cHpnVndKYjhwNEpXY3BuNGpPQ2hBZW5ZZ3JTTndnIiwieSI6ImRTQUFkOVlob09jXzdfUUZtZFNON3VsQ29Qb3NNcGZ4YVlFVUppcndESGcifSwicHVycG9zZXMiOlsiYXV0aGVudGljYXRpb24iLCJrZXlBZ3JlZW1lbnQiXSwidHlwZSI6IkVjZHNhU2VjcDI1NmsxVmVyaWZpY2F0aW9uS2V5MjAxOSJ9XX19XSwidXBkYXRlQ29tbWl0bWVudCI6IkVpRGhWcC14RnhRaEZ2TWtubUVzYnVCZC0xenJsMlpNTGpQd0p1NzNVNUNQTkEifSwic3VmZml4RGF0YSI6eyJkZWx0YUhhc2giOiJFaUFROE9MbWxCcmotRS1hZDZWcDZvZF9DcDQ4Z2JsWnFHdEV0VjJ3YXZPQ1VnIiwicmVjb3ZlcnlDb21taXRtZW50IjoiRWlEcjEzMUx2Mzl1QTJoSE0xY2U3VWtaTTJMUEVtblRsNjZxQWw2TWFadXkydyJ9fQ';


/* GET users listing. */
router.get('/', function(req, res, next) {
    let signer = didJWT.ES256KSigner('f471b9e951eadedcf2de47a574bc76c9d5f85bd4c485423ff0e9c61f8d5b5d42');

    let jwt = (async () => {
        let now = Math.floor(new Date().getTime() / 1000);
        let signer = didJWT.ES256KSigner('f471b9e951eadedcf2de47a574bc76c9d5f85bd4c485423ff0e9c61f8d5b5d42');
        let payload = {
            jti: "2d4de675-cdb4-4c66-871f-b76430f74403",
            iat: now,
            exp: now + 3600,
            response_type: "id_token",
            response_mode: "post",
            scope: "openid",
            nonce: "uAFlqIIrylxyV10EmZ2E9A==",
            client_id: "did:web:zkp-ld.org",
            redirect_uri: "https://vp-app.azurewebsites.net/vp2",
            state: "djHMKtRn7MozQBS8uGB0JL2CjTYBFVf3BzohcBlaBlgY9NzaTmv4TmfiWpXH8mIYLYNJVhpgegux0LoJ4KytR4UdXDVDm0yrdzXU8oVfLBO5Bv5oj1wlA2snZDxmkYpfr/x0mt5eU6t0RKR2sIl9a545ZaTjaN+hLTMl5Bg5L0Cx0e0y/bxmPDvpOf7IRRqphXinVLmFHlXRZQsGXclHKXY9ZZtLoHVFkP2mWoK0/YYBF5FhjZWhhDPwy9W1qZTTmfdKXutbinB4pXKXUNj78MJCV0ZFwEp0EcITU8Ver0KamuXEZSI39aU9oXaRmKMzr9aczZja0oMkxLY76FX9h2O9iTqQG5oN/UJnxoMZaAB9Aogwidg5COCA58QowTVGV3l/RJ672CVwaX3Q2dfbfNdNHfigBJvOe/rC3mGVe2bLCc7WZuuiDrVzm4rLgyRaj7IADONiZLbTCel/DT9LsumgtaTWMUk1R43bypp9ok1JxiaMJ6lRI7azfuN5OkrF0VuoOH6OCQJrarjcBM2fjBckMudpH+70M898OAn9cT3uYIvR/SgZ/r76LNJKaYRsQ0HeEOFUeGDyXSJgqHt1nRkvpHVUBO0Q6Cs5NQ==",
            registration: {
                client_name: "クレデンシャル検証者",
                subject_syntax_types_supported: [
                    "did:ion"
                ],
                vp_formats: {
                    jwt_vp: {
                        alg: [
                            "ES256K",
                            "EdDSA"
                        ]
                    },
                    jwt_vc: {
                        alg: [
                            "ES256K",
                            "EdDSA"
                        ]
                    }
                },
                client_purpose: "属性確認のため"
            },
            claims: {
                vp_token: {
                    presentation_definition: {
                        id: "8493ede8-02d3-4156-abeb-fc2a4e33014e",
                        input_descriptors: [
                            {
                                id: "https://zkp-ld.org/NameCredential",
                                name: "https://zkp-ld.org/NameCredential",
                                purpose: "姓名確認のため",
                                schema: [
                                    {
                                        uri: "https://zkp-ld.org/NameCredential"
                                    }
                                ],
                                constraints: {
                                    fields: [
                                        {
                                            path: [
                                                "$.issuer",
                                                "$.vc.issuer",
                                                "$.iss"
                                            ],
                                            filter: {
                                                type: "string",
                                                pattern: "did:web:zkp-ld.org"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            }
        };

        let jwt = await didJWT.createJWT(
            payload,
            { issuer: did, signer },
            { alg: 'ES256K' }
        )
        return jwt;
    });

    jwt().then(responseMessage => {
        res.set('Content-Type', 'application/jwt');
        res.set('request-id', '7d28a33be02d8169b67350ef11355a0c');
        res.send(responseMessage);
    });    
});

module.exports = router;
