const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Users =  require('./models/users');

const app = express();

const router = express.Router();
app.use(cors());

app.use(bodyParser.json());

mongoose.connect('mongodb://week4project:week4project@ds123625.mlab.com:23625/shoppingcart',{ useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MangoDB Connection Established Successfully");
});

router.route('/user').get(function(req,res) {
    Users.find({}, function(err, user) {
        if(err) throw err;
        res.json(user);
    })
});

//To add a new user to users collection
router.route('/user/add').post((req, res) => {
    let user = new Users(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

//To login a user

router.route('/user/login').post((req,res) => {
    Users.findOne({email : req.body.username, password : req.body.password},function(err, result){
        if(err) {
            throw err;
        }
        if(result) {
            res.send(true);
        } else {
            Users.findOne({phone : req.body.username, password : req.body.password},function(err, result) {
                if(err) {
                    throw err;
                }
                if(result) {
                    res.send(true);
                } else {
                    res.send(false);
                }
            });
        }
    });
});


app.use('/', router);

app.listen(4000, function() {
    console.log("Running on port 4000");
});