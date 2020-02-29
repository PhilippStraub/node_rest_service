//Importieren
const express = require('express');
const bodyParser = require('body-parser'); //https://www.npmjs.com/package/body-parser
const mongoose = require('mongoose');
const morgan = require('morgan');

//Initialisieren
const app = express();
const port = 9020;




//API importieren
const api = require("./pruefung-api");

//Parse the body of the request
app.use(bodyParser.urlencoded({ extended: false })); //querystring library (when false) or the qs library (when true): https://stackoverflow.com/questions/29136374/what-the-difference-between-qs-and-querystring
//in json wandeln
app.use(bodyParser.json());

//Build connection to MongoDB and fix DeprecationWarning
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://localhost/node_rest_service');

var db = mongoose.connection;


console.log(
    "\n"+
    ".########..########..######..########.....######..########.########..##.....##.####..######..########\n"+
    ".##.....##.##.......##....##....##.......##....##.##.......##.....##.##.....##..##..##....##.##......\n"+
    ".##.....##.##.......##..........##.......##.......##.......##.....##.##.....##..##..##.......##......\n"+
    ".########..######....######.....##........######..######...########..##.....##..##..##.......######..\n"+
    ".##...##...##.............##....##.............##.##.......##...##....##...##...##..##.......##......\n"+
    ".##....##..##.......##....##....##.......##....##.##.......##....##....##.##....##..##....##.##......\n"+
    ".##.....##.########..######.....##........######..########.##.....##....###....####..######..########\n"
);

if(!db){
    console.log("Db Error: No connection");
}
    
else {
    console.log("Db connected successfully");
}

require('dns').resolve('www.google.com', (err) =>{
    if(err){
        console.log("Bootstrap not available: No Internet connection");
    } 
});
    

//Use logging tool
app.use(morgan(':method :url :status :res[content-length] | :response-time ms'));

// Use Api routes in the App
app.use('/api', api);



/*
- -  Hint - -
funtion(){} 
ist equivalent zu 
() => {} 
seit ECMAscript 6
*/

//Static files holen
app.use('/static', express.static(__dirname + '/static'));

app.get('/', (req, res) => {

    res.sendFile('views/index.html', {root: __dirname })

    console.log(require("os").userInfo().username +" connected to UI");
});

app.listen(port, () => {
    
    console.log(" -> Running on port: " + port +"\n");
});
