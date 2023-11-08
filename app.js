require("dotenv").config();
const express = require("express");
const app = express();
const { ConectionDb } = require("./db/conection");
const port = process.env.PORT || 3000;
const cors = require("cors");
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
