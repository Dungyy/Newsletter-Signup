//jshint esversion: 6

const express = require("express");
const bodyPaser = require("body-parser");
const get = require("request"); 

const app = express();

app.get('/', function(req, res){
    res.send("The connection was a sucess.")
});



app.listen(4000, function(){
    console.log("Server Running On 4000")
});