var GoogleAuth = require('google-auth-library');

var auth = new GoogleAuth;
var client = new auth.OAuth2('663612425604-5tilrctspqjau1je9hgkq9h725gpjbp1.apps.googleusercontent.com', '', '');



const verifyToken = function(token, clientID) {
  return new Promise ((resolve, reject) => {
    client.verifyIdToken(
      token,
      clientID,
      (e, login) => {
        if (login) {
         var payload = login.getPayload();
         var gmail = payload['email'];
         var first = payload['given_name'];
         var last = payload['family_name'];
         var result = {
          gmail: gmail,
          first: first,
          last: last
         }
         resolve(result);
       } else {
        reject("invalid token");
       }
      }
    )
  })
}

module.exports.verifyToken = verifyToken;

