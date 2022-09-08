const express = require("express");
const app = express();

let port = process.env.PORT || 3010;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;

MongoClient.connect("mongodb://localhost:27017", function (err, client) {
  if (err) {
    console.log(err);
    console.log("🔴 No se ha podido conectar con mongo");
  } else {
    app.locals.db = client.db("hotel");
    console.log("🟢 MongoDB conectado");
  }
});

let clientes = require("./src/clientes");
let habitaciones = require("./src/habitaciones");
let reservas = require("./src/reservas");

app.use("/API/clientes", clientes);
app.use("/API/habitaciones", habitaciones);
app.use("/API/reservas", reservas);

app.listen(port, () => {
  console.log(`🌐 Server listening at http://localhost:${port} `);
});
