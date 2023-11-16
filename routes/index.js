const express = require('express');
const router = express.Router();
//const app = express();
const fs = require("fs");
const path = require('path');
const PATH_ROUTES = __dirname;

//CHANGES
fs.readdirSync(PATH_ROUTES).forEach((file) => {
  const ext = path.extname(file);
  const name = path.basename(file, ext);

  if (name !== 'index' && ext === '.js') {
    const route = require(`./${file}`);
    
    if (typeof route === 'function') {
      // Check if the required file exports a function (middleware)
      router.use(`/${name}`, route);
    } else if (route && typeof route === 'object' && typeof route.router === 'function') {
      // Check if the required file exports a router instance
      router.use(`/${name}`, route.router);
    } else {
      console.error(`Invalid route file: ${file}`);
    }
  }
});

// Example of mounting a specific route (swagger.js) separately
const swaggerRoute = require('./swagger.js');
router.use('/api-docs', swaggerRoute);

module.exports = router;




// const authcontroller = require('../controllers/auth.js');
// const {auth} =require('express-openid-connect');


// const removeExtension = (fileName) => {
//   return fileName.split(".").shift();
// };
// fs.readdirSync(PATH_ROUTES).filter((file) => {
//   const name = removeExtension(file);
//   if (name !== 'index') {
//       //router.use(`/${authcontroller.authentication}`)
//       router.use(`/${name}`,require(`./${file}`))
//   }
// });
// router.use('/', require('./swagger.js'));
// // console.log(authcontroller.config);
// // router.use(auth(authcontroller.config));



// //http://localhost:8080/login
// module.exports = router;
