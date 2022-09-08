const { application } = require('express');
const express = require('express');
const router = express.Router();

module.exports = router;


router.post("/registro",function(req, res) {
    let dni = req.body.dni;
    let numHab = req.body.numHab;
    console.log(numHab)
    let fechaCi = req.body.fechaCi;
    let fechaCo = req.body.fechaCo;
    let registro={"dni":dni,"numHab":numHab,"fechaCi":fechaCi,"fechaCo":fechaCo};

    req.app.locals.db
    .collection('clientes')
    .find({"dni":dni})
    .toArray(function(err,datos){
        if (datos.length==0) {
            res.send({ error: true, data: datos, mensaje: "Cliente no encontrado, reguitre el cliente antes 🔴" });
            }
        else{
            req.app.locals.db
            .collection('habitaciones')
            .find({"numHab":parseInt(numHab)})
            .toArray(function(err,datos){
            console.log(datos)
            if (datos.length==0) { // en desuso por el selector de habitación
                res.send({ error: true, data: datos, mensaje: "No existe la habitación seleccionada 🔴" });
            }
            else if (datos[0].estado=="Ocupada") {
            res.send({ error: true, data: datos, mensaje: "Habitación ocupada, pruebe con otra habitación 🖐" });
            }
            else{
                req.app.locals.db
                .collection('habitaciones')
                .updateOne({"numHab":parseInt(numHab)},{$set: {"estado":"Ocupada"}})
                req.app.locals.db
                .collection('reservas')
                .insertOne( registro, 
                    function(err,respuesta){
                        res.send({mensaje:"🟢 Habitación reservada"})
                    });
        }})
        }
        })
    
   });
            
router.get('/', function(req, res){
    req.app.locals.db
    .collection('reservas')
    .find()
    .toArray( 
    function(err, datos){
    if(err!=null) {
        console.log(err);
        res.send({mensaje: "error: " + err});
    } else {
        // console.log(datos);
        res.send(datos);
    } });});

router.put("/modificar", function(req, res) {
    let modificacion=req.body;
    req.app.locals.db
    .collection('reservas')
    .updateOne({ dni:req.body.dni},{ $set: modificacion },
    function(err, datos) {
        if(err!=null) {
            console.log(err);
            res.send({mensaje: "error: " + err});
        } 
        else {
            console.log(datos);
            res.send(datos);
            }
        });});

router.delete("/check-out",function(req, res) {
    let dni = req.body.dni;
    req.app.locals.db
    .collection('reservas')
    .find({"dni":dni})
    .toArray(function(err,datos){
                if (datos.length==0) {
                    res.send({ error: true, data: datos, mensaje: "Cliente no encontrado, no es posible acceder a la reserva" });
                }
                else{req.app.locals.db
                    .collection('habitaciones')
                    .updateOne({"numHab":parseInt(datos[0].numHab)},{$set: {"estado":"Libre"}})
                    req.app.locals.db.collection('reservas').deleteOne({"dni":dni})
                    res.send({ error: false, data: datos, mensaje: "Check-out realizado con éxito. Gracias por su estancia" });
                }
                })
           });

module.exports=router;
        