const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const apicache = require('apicache')

const port = 3000;

const app = express();
let cache = apicache.middleware;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
 
app.get("/", function(req, res){ 
    res.sendFile(__dirname + "/index.html");
});  
   

app.get("/loc", cache('2 minutes'), function(req, res) {

    var lat = req.query.lat; 
    var lon = req.query.lon;
    const apiKey = "8cc62504338c9670c359c0caff038fca";
    const urls = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lat=${lat}&lon=${lon}`; 
    https.get(urls, (response) => { 
        response.on("data", (data) => {
            const weatherData = JSON.parse(data); 
            res.send(weatherData);  
    });
}); 
}); 


app.get("/api", cache('2 minutes'), function(req, res) { 
 
    var city = req.query.q;
    const apiKey = "8cc62504338c9670c359c0caff038fca";
    const urls = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=${city}`; 
    https.get(urls, (response) => { 
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            res.send(weatherData); 
    });
}); 
});


 


app.listen(port, function(){
    console.log(`Server is running on port: ${port}.`);
    
});