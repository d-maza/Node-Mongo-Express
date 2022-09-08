const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("🌐 Conexión a la BD exitosa...");
});

connection.on("error", (err) => {
  console.log("Error en la conexión a la BD: ", err);
});

//modelo
const Libro = mongoose.model("Libro", { titulo: String, leido: Boolean });

app.post("/add", (req, res) => {
  const libro = new Libro({ titulo: req.body.titulo, leido: false });

  libro
    .save()
    .then((doc) => {

      res.json({ response: "success", libro });

    })
    .catch((err) => {
      console.log("Error al insertar ", err.message);
      res.status(400).json({ response: "failed" });
    });
});

app.get("/getall", (req, res) => {
  Libro.find({}, "titulo leido")
    .then((doc) => {
      res.json({ response: "success", data: doc });
    })
    .catch((err) => {
      console.log("Error al consultar elementos...", err.message);
      res.status(400).json({ response: "failed" });
    });
});

app.get("/leido/:id/:status", (req, res) => {
  const id = req.params.id;
  const status = req.params.status == "true"; // convertir a boleano

  Libro.findByIdAndUpdate({ _id: id }, { $set: { leido: status } })
    .then((doc) => {
      res.json({ response: "success", data: doc });
      
    })
    .catch((err) => {
      console.log("Error al actualizar dato ", err.message);
      res.status(400).json({ response: "failed" });
    });
  
});


app.put("/editarLibro/:id/:status", (req, res) => {
  const id = req.params.id;
  const status = req.params.status == "true"; // convertir a boleano

  Libro.findByIdAndUpdate({ _id: id }, { $set: { leido: status } })
    .then((doc) => {
      res.json({ response: "success", data: doc });
      
    })
    .catch((err) => {
      console.log("Error al actualizar dato ", err.message);
      res.status(400).json({ response: "failed" });
    });
  
});

app.get("/delete/:id", (req, res) => {
  const id = req.params.id;

  Libro.findByIdAndDelete({ _id: id })
    .then((doc) => {
      console.log("Dato eliminado 🔥",  doc);
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Error al eliminar dato ", err.message);
      res.status(400).json({ response: "failed" });
    });
});

app.listen(port, () => {
  console.log(`✅ Server listening at http://localhost:${port} `);

});
