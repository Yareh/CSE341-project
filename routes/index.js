const express = require('express');
const router = express.Router();
//const app = express();
const fs = require("fs");
const PATH_ROUTES = __dirname;

//const authcontroller = require('../controllers/auth.js');

//CHANGE
// router.get("/", (req, res) => {
//   console.log(req.oidc.isAuthenticated());
// });

const authcontroller = require('../controllers/auth.js');
const {auth} =require('express-openid-connect');


const removeExtension = (fileName) => {
  return fileName.split(".").shift();
};
fs.readdirSync(PATH_ROUTES).filter((file) => {
  const name = removeExtension(file);
  if (name !== 'index') {
      //router.use(`/${authcontroller.authentication}`)
      router.use(`/${name}`,require(`./${file}`))
      router.use('/api-docs', require('./swagger.js'))
      router.use(auth(authcontroller.config))
  }
});



//http://localhost:8080/login
module.exports = router;
