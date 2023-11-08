const express = require('express');
const router = express.Router();
const app = express();
const fs = require("fs");
const PATH_ROUTES = __dirname;

//CHANGE
// router.get("/", (req, res) => {
//   console.log(req.oidc.isAuthenticated());
// });


const removeExtension = (fileName) => {
  return fileName.split(".").shift();
};
fs.readdirSync(PATH_ROUTES).filter((file) => {
  const name = removeExtension(file);
  if (name !== 'index') {
      router.use(`/${name}`,require(`./${file}`))
      router.use('/api-docs', require('./swagger.js'));
  }
});


module.exports = router;
