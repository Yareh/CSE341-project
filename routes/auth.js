const express = require("express");
const router = express.Router();
const authcontroller = require('../controllers/auth.js');

router.get('/',authcontroller.authentication);

module.exports = router;
