const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs');

var mongoUri = ***************;

MongoClient.connect(mongouri, (err, db) => {
    if (err) return console.log(err);
    app.listen(8000, () => {
        console.log('listening on 8000');
    });
    app.get('/', (req, res) => {
        db.collection('products').find().toArray(function(err, results){
            res.render('index.ejs', {products: results});
        });
    });
    app.post('/products', (req, res) => {
        db.collection('products').save(req.body, (err, result) => {
            if (err) return console.log(err);
            console.log('saved to database');
            res.redirect('/');
        })
    });
    
    app.post('/users', (req, res) => {
        var userName = req.body.name;
        var userPassword = req.body.password;
        db.collection('users').find({"name": userName, "password": userPassword}).count(function(err, result){
            if (err) return console.log(err);
            if (result == 0) {
                console.log('user not found');
            } else {
                console.log('user found');
            }
        });
        res.redirect('/');
    });
    
    app.post('/users/addNewUser', (req, res) => {
        db.collection('users').save(req.body, (err, result) => {
            if (err) return console.log(err);
            console.log('added new user');
            res.redirect('/');
        })
    });
});

app.use(bodyParser.urlencoded({extended: true}));