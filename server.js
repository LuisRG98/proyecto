const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
};

app.use(cors(corsOptions));


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb+srv://BaCkItO:HL2021lh@cluster0.ikesz.mongodb.net/practice?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado a MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Error de conexion", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la aplicacion" });
});


require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/product.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
