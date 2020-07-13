'use strict';
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
var gcm = require('node-gcm');
var mysql = require('mysql');
const compression = require('compression')

var app = express();
app.use(compression());

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cookieParser());

//To server static assests in root dir
app.use(express.static(__dirname));

app.use(flash());
 
app.use(session({ 
  secret: '123456cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

//To allow cross origin request
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Covid#123"
});

connection.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected!:)');
  }
});

var router = express.Router();

app.post('/authentication', function(req, res, next) {
       
    var email = req.body.email;
    var password = req.body.password;
 
        connection.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password], function(err, rows, fields) {
            if(err) throw err
            if (rows.length <= 0) {

            }
            else { 
 
            }            
        })
  
})

app.post('/order', function(req, res, next) {
       
  var email = req.body.email;
  var password = req.body.password;

      connection.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password], function(err, rows, fields) {
          if(err) throw err
          if (rows.length <= 0) {
            
          }
          else { 

          }            
      })

})


app.get('/getProducts', function(req, res, next) {
       
  var email = req.body.email;
  var password = req.body.password;

      connection.query('SELECT * FROM accounts WHERE email = ? AND password = ?', function(err, rows, fields) {
          if(err) throw err
          if (rows.length <= 0) {
            
          }
          else { 

          }            
      })

})

 
//display login page
app.get('/login', function(req, res, next){    

})
 
// Logout user
app.get('/logout', function (req, res) {
    req.session.destroy();
    req.flash('success', 'Login Again Here');
    res.redirect('/login');
});


//To server index.html page
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});




app.listen(process.env.PORT || 3000, function() {
  console.log('Local Server : http://localhost:3000');
});