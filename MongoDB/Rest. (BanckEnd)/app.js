const express = require('express');
const app = express();
const mongoose = require('mongoose');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/pruebas', {

}, (err) => {
    if (!err) {
        console.log('🟢 MongoDB Connection Succeeded.')
   
    } else {
        console.log('🔴 Error in DB connection: ' + err)
    }
});


app.use(require("./menus"));


// Connection
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`🌐 App running in http://localhost:${PORT}`)
})