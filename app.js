const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { status } = require("express/lib/response");
const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    const firstname =req.body.fname;
    const lastname =req.body.lname;
    const email =req.body.email;
    const data = {
        members: [
            {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname,

            }}
        ]
    };
    const jsonData = JSON.stringify(data);
    const url="https://us9.api.mailchimp.com/3.0/lists/12d7b7a0e6";
    const options = {
        method:"POST",
        auth:"amrit1:35f5442a9e412bb147456ea0b5a95b2a-us9"
    }

    const request = https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});
app.listen(process.env.PORT,function(){
    console.log("Server running on port 3000");
});
// 35f5442a9e412bb147456ea0b5a95b2a-us9
// yhs5tyrh