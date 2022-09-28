let didJWT = require("did-jwt");
var express = require('express');
var conf = require('./const.js');
var router = express.Router();


router.get('/:uuid', function(req, res, next) {
    let uuid = req.params.uuid;

    let jwt = (async () => {
        let now = Math.floor(new Date().getTime() / 1000);

        let payload = {
            jti: "2d4de675-cdb4-4c66-871f-b76430f74403",
            iat: now,
            exp: now + 3600,
            response_type: "id_token",
            response_mode: "post",
            scope: "openid",
            nonce: "uAFlqIIrylxyV10EmZ2E9A==",
            client_id: conf.did, // verifier の DID
            redirect_uri: "https://vp-app.azurewebsites.net/verify/" + uuid,
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
            { issuer: conf.did, signer: conf.signer },
            { alg: 'ES256K', kid: conf.did + '#auth-key' }
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
