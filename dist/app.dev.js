"use strict";

var express = require('express');

var path = require('path');

var fs = require('fs');

var app = express(); //addig database

var mongoose = require('mongoose');

var bodyparser = require("body-parser");

mongoose.connect('mongodb://localhost/contactDance', {
  useNewUrlParser: true
});
var port = 80; // to run 
// type mongod and mongosh in another terminal
//define mongoose schema

var contactDance = new mongoose.Schema({
  name: String,
  mail: String,
  phone: String,
  address: String,
  suggestion: String
});
var supports = mongoose.model('supports', contactDance); //express related information

app.use('/static', express["static"]('static'));
app.use(express.urlencoded()); //pug realted information

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); //endpoints

app.get("/", function (req, res) {
  var parm = {
    title: "Dance Academy",
    content: "paragraph things"
  };
  res.status(200).render('home.pug', parm);
});
app.get("/home", function (req, res) {
  var parm = {
    title: "Dance Academy",
    content: "paragraph things"
  };
  res.status(200).render('home.pug', parm);
});
app.get("/academy", function (req, res) {
  var parm = {
    title: "Dance Academy",
    content: "paragraph things"
  };
  res.status(200).render('academy.pug', parm);
});
app.get("/events", function (req, res) {
  var parm = {
    title: "Dance Academy",
    content: "paragraph things"
  };
  res.status(200).render('event.pug', parm);
});
app.get("/support", function (req, res) {
  var parm = {
    title: "Dance Academy",
    content: "paragraph things"
  };
  res.status(200).render('support.pug', parm);
}); //to save in database

app.post("/support", function (req, res) {
  var mydata = new supports(req.body);
  mydata.save().then(function () {
    res.send("Item successfully saved in database");
  })["catch"](function () {
    res.status(400).send("Failed to save in database");
  });
}); //to save data in system from user input
// app.post('/support',(req,res)=>{
//     console.log(req.body)
//     name=req.body.name;
//     mail=req.body.mail;
//     phone=req.body.phone;
//     address=req.body.address;
//     suggestion=req.body.suggestion;
//     let OutputToWrite=`Form filled by ${name} \n Name: ${name} \n E-mail: ${mail} \n phone : ${phone} \n address: ${address} \n suggestion: ${suggestion} \n \n \n`
//     fs.appendFileSync('output.txt',OutputToWrite)
//     const params={'message':'Deatils submitted successfully successfully'}
//     res.status(200).render('support.pug',params);
// })
//start the server

app.listen(port, function () {
  console.log("Dance academy server successfully starts on port ".concat(port));
});