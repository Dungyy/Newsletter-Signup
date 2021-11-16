//jshint esversion: 6

const express = require("express");
const bodyPaser = require("body-parser");
const request = require("request"); 
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyPaser.urlencoded({extended: true}));

//routes
app.get('/', function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    var data = {
        memebers: [
            {
                email_address: email,
                status: "subscribed",
                merge_field: {
                   FNAME: firstName,
                   LNAME: lastName 
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    
    const url = "https://us20.api.mailchimp.com/3.0/lists/d7708b2b62";
    
    const options = {
        methond: "POST",
        auth: "dungy:9e82352449d9bff1c75637e4dbcd39c8-us20"
    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

//Server PORT
app.listen(4000, function(){
    console.log("Server Running On 4000")
});
