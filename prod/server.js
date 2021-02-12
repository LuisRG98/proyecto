const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*",
  methods: "GET, POST, PUT, DELETE, OPTION"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded, html
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado a la DB!");
  })
  .catch(err => {
    console.log("No se pudo conectar a la DB!", err);
    process.exit();
  });
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Que mira prro." });
});
require("./app/routes/product.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}.`);
});