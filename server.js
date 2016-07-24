// URL shortener microservice

var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var app = express();

var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
  
});

// app.get("/", function (req, res) {
   
//   res.send("url shortener");
// });

var re = new RegExp("^/new/https?://(www\.)?\\w+\\..+$");

app.get(re, function (req, res) {
    var fullUrl = req.url;
    var indexOfSlash = fullUrl.indexOf("http");
    var originalUrl = fullUrl.substr(indexOfSlash);
    
    var randomNum = Math.floor((Math.random() * 9000) + 1000);
    // console.log(req.headers.host);
    // console.log(req.headers.host.substr(0, req.headers.host.length - 3));
    
    
    var shortUrl = "http://" + req.headers.host + "/" + randomNum;
    console.log("creating: " + req.headers.host);
    var bothUrls = {original_url: originalUrl, short_url: shortUrl};
    MongoClient.connect('mongodb://admin:admin123@ds029705.mlab.com:29705/data', function(err, db) {
        if (err) throw err;
        
        var urlCollection = db.collection('urlCollection');
          
        urlCollection.insert(bothUrls, function(err, data) {
            if (err) throw err;
            // console.log(data);
            db.close();
            });
    });
    
    res.send(JSON.stringify(bothUrls));
  
});

var re2 = new RegExp ("^/\\d{4}$");

app.get(re2, function (req, res) {
    
    var indexOfSecondColon = req.headers.host.indexOf(":", 7);
    // console.log(indexOfSecondColon);
    // console.log(req.headers.host.substr(0, indexOfSecondColon));
    var shortUrl = "http://" + req.headers.host.substr(0, indexOfSecondColon) + req.url;
    // console.log(req.headers.host);
    // console.log(shortUrl);
    var originalUrl;
    MongoClient.connect('mongodb://admin:admin123@ds029705.mlab.com:29705/data', function(err, db) {
        if (err) throw err;
        
        var urlCollection = db.collection('urlCollection');
        
        
        var resultArry = urlCollection.find({
            short_url: shortUrl
        }).toArray(function(err, doc) {
            if (err) throw err;
            // console.log(doc);
            
            var originalUrl = doc[0].original_url;
            
            res.redirect(originalUrl);
            db.close();
        });
      
    });
});

app.get('*', function(req, res){
  
  res.send(JSON.stringify( {error: "URL invalid"}));
});

app.listen(port, function () {
  console.log('App is running on port ' + port);
});