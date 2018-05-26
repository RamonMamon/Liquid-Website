let express = require('express');
let app = express();
let bodyParser = require('body-parser');
var path = require("path");

const port = 80;
const internalServerError = 500;
const OK = 200;
var clientDirectory = path.join(__dirname,'../LQDCatalog');

//These are static directories for the webpage to access.
app.use(express.static(clientDirectory));
app.use("/images",  express.static(path.join(clientDirectory,'/images')));
app.use("/css",  express.static(path.join(clientDirectory,'/css')));
app.use("/js", express.static(path.join(clientDirectory,'/js')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const moltin = require('@moltin/sdk');

const Moltin = moltin.gateway({
  client_id: '99WMj74mT9o9bRHQqBswfFMyDrC8GqxHbX2ytpOsS7',
  client_secret: 'bXM5Nx3J22cLeMAVK8dGo00RKpxGwTtpJwAhnOOqRz'
});

/**
 * Sends the index.html file to the client.
 */
app.get('/', function(req, res) {
    console.log('Request Type: ', req.method);
    res.status(OK);
    res.sendFile(path.resolve(clientDirectory, './index.html'));
});

// Logs any server-side errors to the console and send 500 error code.
app.use(function (err, req, res) {
    // TODO: Add a response to the error.
    console.error("Error: " + err.stack);
    req.status(internalServerError).send('Something broke!');
});

app.listen(port, function(){
    console.log('Server running, access the website by going to http://staylqd.com/');
});

//Implement Admin page request here

