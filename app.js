const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https =require("https");

   
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.post("/",function(req,res){
    const num1= req.body.fname;
    const num2= req.body.lname;
    const email = req.body.email;
    console.log(num1,num2,email);

    const data = {
        members :[
            {
                email_address: email, 
                status :"subscribed",
                merge_feilds:
                {
                    FNAME : num1,
                    LNAME : num2
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data)

    const url = "https://us21.api.mailchimp.com/3.0/lists/28909299af" ;
    const options = {
        method :"POST",
        auth : "akshit:d708efd0c97b80de1545ee5024573c8f-us21"
    }

    const request = https.request(url,options,function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        } else {
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end()
})
app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
})



app.listen(process.env.PORT || 3000,function()
{
    console.log("Server started on port 3000");
})

// api key  = d708efd0c97b80de1545ee5024573c8f-us21
//auidence id  = 28909299af.