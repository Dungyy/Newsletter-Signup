//jshint esversion: 6

const express = require("express");
const bodyPaser = require("body-parser");
const request = require("request"); 
const https = require("https");

require('dotenv').config();


const app = express();

app.use(express.static("public"));
app.use(bodyPaser.urlencoded({extended: true}));


app.get('/', function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                   FNAME: firstName,
                   LNAME: lastName 
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    
    const url = "https://us20.api.mailchimp.com/3.0/lists/d7708b2b62";
    
    const options = {
        method: "POST",
        auth: process.env.auth
    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/sucess.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});


app.post("/failure", function(req, res){
    res.redirect("/");
});

//Server PORT
app.listen(process.env.PORT || 4000, function(){
    console.log("Server Running On: 4000")
});
