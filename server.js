require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const { ConectionDb } = require("./DB/conection");

//prevent No 'Access-Control-Allow-Origin'
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})

// database connection
ConectionDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } else {
    console.log(`Conection error: ${err}`);
  }
});
/* ROUTES */
app.use("/", require("./routes"));
