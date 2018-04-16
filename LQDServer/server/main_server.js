let express = require('express');
let app = express();
let bodyParser = require("body-parser");
let expressWs = require('express-ws')(app);
var path = require("path");
// let auth = require('basic-auth');

// requires the server model and initialises it.
// let model = require('./server_model.js');
// let tronModel = model.init();

const port = 8080;
const internalServerError = 500;
const OK = 200;
var clientDirectory = path.join(__dirname,'../../LQDCatalog');

//These are static directories for the webpage to access.
app.use(express.static(clientDirectory));
app.use("/images",  express.static(path.join(clientDirectory,'/images')));
app.use("/css",  express.static(path.join(clientDirectory,'/css')));
app.use("/js", express.static(path.join(clientDirectory,'/js')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {//TODO
        ws.send(msg+ " from server");
        console.log("client has connected.");

        // handleClientMessage(ws, msg);
    });
    ws.on('connection', function(){
        console.log("Connected");
    });
    ws.on('close', function(){
        console.log("Client disconnected");
    })
});

/**
 * Sends the index.html file to the client.
 */
app.get('/', function(req, res) {
    console.log('Request Type: ', req.method);
    res.status(OK);
    res.sendFile(path.resolve(clientDirectory, './index.html'));
    // res.sendFile(path.resolve('../../LQDCatalog/js/'));
    // res.sendFile(path.resolve('../../LQDCatalog/css/'));
});

// Logs any server-side errors to the console and send 500 error code.
app.use(function (err, req, res) {
    console.error(err.stack);
    req.status(internalServerError).send('Something broke!');
});

app.listen(port,function(){
    console.log('Server running, access the website by going to http://localhost:8080/');
});

// /**
//  * Use HTTP BasicAuth to protect API endpoints further down in the
//  * pipeline from unauthenticated access. On successful authentication,
//  * req.authenticated_user is set to the username of the authenticated
//  * user.
//  */
// function authenticate(req, res, next) {
//     let user = auth(req);
//     req.authenticated_user = undefined;
//     if (user === undefined || user.name === undefined || user.pass === undefined) {
//         sendAuthRequest(res, 404);
//     } else {
//         if(!tronModel.authenticateUser(req.query.username, req.query.password)) {
//             sendAuthRequest(res);
//         } else {
//             req.authenticated_user = user;
//             next();
//         }
//     }
// }
/**
 * Sends a message to all clients.
 * Taken from Othello_server example on studres.
 */
function sendToAll(msg) {
    expressWs.getWss().clients.forEach(function(ws) {
        ws.send(JSON.stringify(msg));
    });
}