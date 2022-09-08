const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(    {
        
    "numero" : String,
    "primero" : String,
    "segundo" : String,
    "postre" : String,
    "precio" : Number,
});
    

const Menu = mongoose.model('menu', menuSchema)

module.exports = Menu