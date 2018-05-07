/*
 *      Darby Huye - Exercise Me
 *      index.js - server for this project
 *  TODO: make this a server that does not use a data base??
    or maybe use a data base to save the current state of the calendar?
    Do I want to have just a time given to a userr??

    What I want:
        I want the time to be produced by this service and put on the users
        calendar. I do not want my own calendar. I just want to add a time
        to the users calendar from which i am gathering information from.
 *
 */

const PORT = process.env.PORT || 5000
const cors = require('cors');
const parser = require('body-parser');
const validator = require('validator');
const express = require('express');
const app = express();
const path = require('path');

/* enabling cors */
app.use(cors());
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "X-Requested-With");
    next();
});


app.use(parser.json());
app.use(parser.urlencoded({extended: true})); /* can parse nested objects */

/* tells you where to look for files */
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views')); /* sets default view path */
app.set('view engine', 'ejs');


/*---------------------------------------*/
var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080




/******************** DELETE LATER *********************************/


/*
var MongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nodemongoexample'
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(MongoUri, function(error, databaseConnection) {
    db = databaseConnection;
    console.error("Connected to server.");
}); */


/*
app.post('/something', function(request, response) {
    //do stuff
});

app.get('/', function(request, response) {
    response.set('Content-Type', 'text/html');

    //have two collections
        //1) sunny intervals
        //2) free time intervals 
    response.send();

});*/