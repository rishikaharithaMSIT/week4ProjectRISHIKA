const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var Users =  require('./models/users');
var Products =  require('./models/products');
var Orders = require('./models/orders');
var cookieParser = require('cookie-parser');
var session =  require('express-session');
const app = express();
var guessOrUser = "guest";
const router = express.Router();
app.use(cors());
const urlencodedParser = bodyParser.urlencoded({extended:false});
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret:"qwerty",resave:false,saveUninitialized:true}));
mongoose.connect('mongodb://week4project:week4project@ds123625.mlab.com:23625/shoppingcart',{ useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MangoDB Connection Established Successfully");
});
//--------------------------------------REFERENCE METHOD-------------------------
// router.route('/user').get(function(req,res) {
//     Users.find({}, function(err, user) {
//         if(err) throw err;
//         res.json(user);
//     })
// });
//--------------------------------------------------------------------------------

//-------------------------------------------USER DATABASE------------------------
//To add a new user to users collection
router.route('/user/add').post((req, res) => {
    Users.findOne({email : req.body.email},function(err, result){
        if(err) {
            throw err;
        }
        if(result) {
            guessOrUser = result._id;
            res.send(true);
        } else {
            Users.findOne({phone : req.body.phone},function(err, result) {
                if(err) {
                    throw err;
                }
                if(result) {
                    guessOrUser = result._id;
                    res.send(true);
                } else {
                    let user = new Users(req.body);
                    user.save()
                        .then(user => {
                                //res.status(200).json({'user': 'Added successfully'});
                        })
                        .catch(err => {
                            //res.status(400).send('Failed to create new record');
                        });
                        res.send(false);
                }
            });
        }
    });
    
});

//To login a user
router.route('/user/login').post((req,res) => {
    Users.findOne({email : req.body.username, password : req.body.password},function(err, result){
        if(err) {
            throw err;
        }
        if(result) {
            guessOrUser = result._id;
            res.send(true);
        } else {
            Users.findOne({phone : req.body.username, password : req.body.password},function(err, result) {
                if(err) {
                    throw err;
                }
                if(result) {
                    guessOrUser = result._id;
                    res.send(true);
                } else {
                    res.send(false);
                }
            });
        }
    });
});

router.route('/user').get(function(req,res) {
        res.json(guessOrUser);
    });
router.route('/logout').get(function(req,res) {
        guessOrUser = "guest";
        res.json("success");
    });
//----------------------------------------------------USER DATABASE ENDS-----------------------------------

//-----------------------------------------------------PRODUCTS DATABASE ------------------------------------
router.route('/getallProducts').get(function(req,res) {
    Products.find({}, function(err, data) {
            if(err) throw err;
            //console.log(guessOrUser);
            res.send([data,guessOrUser]);
        })
});

router.route('/getproduct/:id').get(function(req,res) {
    var id = req.params.id;
    //console.log(req.params);
    Products.findById(id, function(err, data) {
        if(err) throw err;
        res.send([data,guessOrUser]);
    })
});


//-----------------------------------------------------PRODUCTS DATABASE ENDS -------------------------------

router.route('/user/addcart').post(function(req,res) {
    // console.log(req.body);
    //console.log(req.body.quantity);
    Users.findOne({"cart.product" : req.body.prodid},function(err,result){
        //console.log(result);
        if(result) {
            res.json("exists");
        }
        else {
            Users.update({_id : req.body.userid},{ $push : { cart : [{product : req.body.prodid, 
                                                    prodname : req.body.prodname,
                                                    prodimg : req.body.prodimg,
                                                    prodprice : req.body.prodprice,
                                                    prodavail : req.body.availability,
                                                    quantity : req.body.quantity}]}}, function(err, data){
                    if(req.body.userid != "guest") {
                        res.json("true");
                    } else {
                        res.json("false");
                    }
                });
        }
    });
    
});
router.route('/product/comment').post(function(req,res) {
    var name = "anonymous";
    console.log(req.body.userid);
    if(req.body.userid != "guest") {
        Users.find({_id:req.body.userid}, function(err,data) {
            //console.log(data[0].name);
            name = data[0].name;
            Products.update({_id : req.body.prodid},{ $push : { reviews : [{name : name,comment : req.body.comment}]}}, function(err, data){
                res.json("Comment Posted Successfully");
        });
        });
    } else {
    //console.log(name + " name");
    Products.update({_id : req.body.prodid},{ $push : { reviews : [{name : name,comment : req.body.comment}]}}, function(err, data){
            res.json("Comment Posted Successfully");
    });
}
});

router.route('/getCartItems/:id').get(function(req,res) {
    var id = req.params.id;
    //console.log(req.params);
    Users.findById(id, function(err, data) {
        if(err) throw err;
        res.send(data);
    })
});

router.route('/user/removeFromCart').post(function(req,res) {
    Users.update({_id : req.body.userid},{ $pull: {cart : {product : req.body.prodid}}}, function(err, data){
        res.json("Updated Successfully");
    });
});

router.route('/user/changeCart').post(function(req,res) {
    Users.update({_id : req.body.userid, "cart.product" : req.body.prodid},{ $set : {"cart.$.quantity" : req.body.quantity }}, function(err, data){
        res.json("Updated Successfully");
    });
});

router.route('/user/wallet').post(urlencodedParser, function(req,res) {
    console.log( req.body.userid + "body");
    Users.update({_id:req.body.userid},{ $inc: { wallet: +10}} , function(err, data) {
        res.json("Added Successfully"); 
    })
});

router.route('/orders/add').post((req, res) => {
   
    let order = new Orders(req.body);
    order.save()
        .then(order => {
            res.status(200).json({'user': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
        for(var i = 0 ; i < req.body.cart.length; i++) {
            Products.update({_id : req.body.cart[i].product},{ $inc : { availability : -req.body.cart[i].quantity}}, function(err, data){
                // res.json("Comment Posted Successfully");

            });
        }
    Users.update({_id : req.body.userid},{ $set : { cart : [],wallet : req.body.wallet}}, function(err, data){
    });
});

router.route('/user/addAddress').post(function(req,res) {
    // console.log(req.body);
    //console.log(req.body.quantity)
    Users.update({_id : req.body.userid},{ $push : { address : req.body.address}}, function(err, data){
        if(data) {
            res.send(true);
        } else {
            res.send(false);
        }
    });
});

app.use('/', router);

app.listen(4000, function() {
    console.log("Running on port 4000");
});