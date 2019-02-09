const mongoose = require('mongoose');

const schema = mongoose.Schema;

var userSchema = new schema ({
    name : String,
    email : String,
    phone : String,
    password :String,
    address : Array,
    cart : Array,
    wallet : Number
});

module.exports = mongoose.model('users', userSchema);