var mongoose = require('mongoose');

//Declared schema for the products
const schema = mongoose.Schema;

//Created new Schema for the products
var cartSchema = new schema ({
   
});

//Exported reference model
module.exports = mongoose.model('cart', cartSchema);