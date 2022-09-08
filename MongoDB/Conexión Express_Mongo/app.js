// conexion Express
const express = require('express');
const app = express();

// Middleware Connections
app.use(express.static('public'));

//  parse application/json && /x-www-form-urlencoded &&
app.use(express.urlencoded({extended: false}))
app.use(express.json())

const path = require("path"); // Rutas relativas (Linux, Wndows, Mac)

app.set("view engine", "ejs"); // Renderizado ejs

// Conexion MongoDB - localhost:27017 
const mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;

db="test"

MongoClient.connect( "mongodb://localhost:27017", function(err, client){
    err ?
        console.log("🔴 No se ha podido conectar con MongoBD", err):
        app.locals.db= client.db(db);
        console.log("🟢 MongoDB conectado");  
});
    

// Starting 
app.get("/", function (req, res) {
    app.locals.db.listCollections()
      .toArray(function (err, datos) {
        if (err === null) {
          res.send(err); ;
        } else {
          res.send("✔ Conectado a la base de datos: " + db + " en el localhost "+
            "<br><br> 💾 COLECCIONES DIPONIBLES: <br><br>" + JSON.stringify(datos));
        }
      });
  });

  // Static files (Web)
  app.use(express.static(path.join(__dirname, "../public")));
  
// Routes
//   app.use(require("./routes/index.routes"));
  

  //  404 
  app.use((req, res, next) => {
    res.status(404).send("Dirección no encotrada");
  });


let PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`🌐 Server listening at http://localhost:`+PORT);
});
  
// npm -y init
// npm i express mongodb