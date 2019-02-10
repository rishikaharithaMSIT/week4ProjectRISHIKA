//imported mongoode
var mongoose = require('mongoose');

//Declared schema for the products
const schema = mongoose.Schema;

//Created new Schema for the products
var productSchema = new schema ({
    name : String,
    image : String,
    description : String,
    category :String,
    availability : Number,
    rating: Array,
    reviews :Array,
    offers : Array
});

//Exported reference model
module.exports = mongoose.model('products', productSchema);