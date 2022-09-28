let didJWT = require("did-jwt");

const did = 'did:ion:EiC9VVR3t93KxSNHFvk2_LxW1BZZU-xSzcwEcDhoLtSQug:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJhdXRoLWtleSIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJpYzRjWVdWUWttUHc1dHhFN2dGa1Jpb0NqbDlMZF91b3pUcXB6YkVsZGVnIiwieSI6ImlCYnotSUtjTDJhdFg0QklzbXJZbW5Qa1hBbnRGOGRFWUhDUkpaWU4zaHcifSwicHVycG9zZXMiOlsiYXV0aGVudGljYXRpb24iLCJrZXlBZ3JlZW1lbnQiXSwidHlwZSI6IkVjZHNhU2VjcDI1NmsxVmVyaWZpY2F0aW9uS2V5MjAxOSJ9XSwic2VydmljZXMiOlt7ImlkIjoiZG9tYWluLTEiLCJzZXJ2aWNlRW5kcG9pbnQiOnsib3JpZ2lucyI6WyJodHRwczovL3ZwLWFwcC5henVyZXdlYnNpdGVzLm5ldCJdfSwidHlwZSI6IkxpbmtlZERvbWFpbnMifV19fV0sInVwZGF0ZUNvbW1pdG1lbnQiOiJFaUNLeE85TFBQVndjbzlZQVQ3eFkycDhoVVZLc1F3M2NVVGxNeWJJX1ZoWkhBIn0sInN1ZmZpeERhdGEiOnsiZGVsdGFIYXNoIjoiRWlDeG00eGlyUVMxRXRGUUU2SWpnWThISjBJcHBSemlESmtaaU44NjhsWllsUSIsInJlY292ZXJ5Q29tbWl0bWVudCI6IkVpRDhFZVl2NUlPdU9JOW5MQ0RLVC1UcWFROXNnakxMVXU5ZUJZRElKLW50VmcifX0';
const signer = didJWT.ES256KSigner('01e7000d96b5092770e8390925d2a29b03ac3ad857021645d08d5b54ad6bda81');

module.exports.did = did;
module.exports.signer = signer;
