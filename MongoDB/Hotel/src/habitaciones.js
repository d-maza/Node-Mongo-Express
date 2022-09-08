const express = require('express');
const router = express.Router();

module.exports = router;


router.post("/registro",function(req, res) {
    let numHab = req.body.numHab;
    let estado = req.body.estado;
    let camas = req.body.camas;
    let habitacion={"numHab":numHab,"estado":estado, "camas":camas}
    req.app.locals.db
    .collection('habitaciones')
    .insertOne( habitacion, 
        function(err,respuesta){
            if(err != null) {
            console.log(err),
            res.send({mensaje: "Ha habido un error. " + err } );
            } else {
                res.send({ results: respuesta });
            }});});
            
router.get('/', function(req, res){
    req.app.locals.db
    .collection('habitaciones')
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
    .collection('habitaciones')
    .updateOne({ numHab:req.body.numHab},{ $set: modificacion },
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

router.delete("/eliminar", function(req, res) {
    req.app.locals.db
    .collection('habitaciones')
    .deleteOne({numHab:req.body.numHab}, 
    function(err, datos) {
        if(err!=null) {
            console.log(err);
            res.send({mensaje: "error: " + err});
        } 
        else {
            console.log(datos);
            res.send(datos);
            }
        });
});
        
module.exports=router;
        