require("dotenv").config();
const express = require("express");
const app = express();
const { ConectionDb } = require("./db/conection");
const port = process.env.PORT || 3000;
const cors = require("cors");
//CHANGES
const {auth} = require('express-openid-connect');
require('dotenv').config();


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


app.listen(port, () =>{
  console.log(`Server listening onn http://localhost:${port}`);
});

//ends 

app.use(express.json());
const DIRECTORIO_PERMITIDO_CORS = "*";
app.use(cors({
    origin: DIRECTORIO_PERMITIDO_CORS
}));

ConectionDb((err) => {
    if (!err) {
      app.listen(port, () => {
        console.log(`app listening on port ${port}`);
      });
    } else {
      console.log(`Conection error: ${err}`);
    }
  });

app.use("/",require("./routes"));
