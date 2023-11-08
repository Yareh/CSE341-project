const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require("./db/conection");
const app = express();
const dotenv = require('dotenv'); 
//const { auth } = require('express-openid-connect');
const { auth } = require('express-oauth2-jwt-bearer');

const port = process.env.PORT || 8080;
dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
//app.use('/',require('./routes'));

app.listen(port, () => {
     console.log(`listening on port ${port}`);
});



// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
   audience: 'https://quickstarts/api/',
   issuerBaseURL: `https://localhost:8080/api-docs/`,
  });

  app.get('/api/public', function(req, res) {
    res.json({
      message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
  });

// // This route needs authentication
 app.get('/api/private', checkJwt, function(req, res) {
   res.json({
     message: 'Hello from a private endpoint! You need to be authenticated to see this.'
   });
 });


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});


 app.get('/', (req,res) => {
     res.send(req.oidc)
  });

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
 });




