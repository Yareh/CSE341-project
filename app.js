require("dotenv").config();
const express = require("express");
const app = express();
const { ConectionDb } = require("./DB/conection");
const port = process.env.PORT || 3000;
app.use(express.json());

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
