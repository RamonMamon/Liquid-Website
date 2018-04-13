let express = require('express');
let app = express();
let bodyParser = require("body-parser");
let expressWs = require('express-ws')(app);
let auth = require('basic-auth');

// require the Tron model and initialises it.
let model = require('./server_model.js');
let tronModel = model.init();
let api = require('./tron_api.js');
api.init(tronModel);

const port = 8080;
const internalServerError = 500;
const OK = 200;

app.use('/static',express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {//TODO
        ws.send(msg+ " from server");
        console.log("client has connected.");

        handleClientMessage(ws, msg);
    });
    ws.on('connection', function(){
        console.log("Connected");
    });
    ws.on('close', function(){
        console.log("Client disconnected");
    })
});

/**
 * Sends the tron.html file to the client.
 */
app.get('/', function(req, res) {
    console.log('Request Type: ', req.method);
    res.status(OK);
    res.sendFile('./static/tron.html' , { root : __dirname});
});

/**
 * This is called when a client is attempting to register.
 */
app.post('/user', function(req,res){
    console.log('Request Type: ', req.method);
    api.createUser(req,res);
    res.sendStatus(res.statusCode);
});

/**
 * This is called when a client is requesting for information
 * of all users.
 */
app.get('/user', function(req,res){
    console.log('Request Type: ', req.method);
    api.getUsers(req,res);
    res.sendStatus(res.statusCode);
});

/**
 * This is called when a client is requesting for information
 * of a specific user.
 */
app.get('/user/:username', function(req,res){
    console.log('Request Type: ', req.method);
    api.getUser(req,res);
    res.sendStatus(res.statusCode);
});

/**
 * This is called when a client is attempting to delete a
 * specific user.
 */
app.delete('/user/:username', function(req,res, next){
    authenticate(req, res, next);

    if (req.authenticated_user !== undefined) {
        api.deleteUser(req, res);
    }
    res.sendStatus(res.statusCode);
});

// Logs any server-side errors to the console and send 500 error code.
app.use(function (err, req, res) {
    console.error(err.stack);
    req.status(internalServerError).send('Something broke!');
});



app.listen(port,function(){
    console.log('Server running, access game by going to http://localhost:8080/');
});

/**
 * Use HTTP BasicAuth to protect API endpoints further down in the
 * pipeline from unauthenticated access. On successful authentication,
 * req.authenticated_user is set to the username of the authenticated
 * user.
 */
function authenticate(req, res, next) {
    let user = auth(req);
    req.authenticated_user = undefined;
    if (user === undefined || user.name === undefined || user.pass === undefined) {
        sendAuthRequest(res, 404);
    } else {
        if(!tronModel.authenticateUser(req.query.username, req.query.password)) {
            sendAuthRequest(res);
        } else {
            req.authenticated_user = user;
            next();
        }
    }
}
// app.use(express.static('static'));

/**
 * Send an HTTP BasicAuth authentication request.
 */
function sendAuthRequest(res, code) {
    res.statusCode = code;
    res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
    res.end('Unauthorized');
}

let games = [];

/**
 * Based off the code from the Othello exercise program.
 * Used to handle incoming messages from the client and
 * dispatches the command from the message to the appropriate
 * handler.
 */
function handleClientMessage(ws, msg) {
    let json = JSON.parse(msg);
    let recipient = json.player;
    let sender = json.username;
    switch (json.type) {
        case 'available' : {
            console.log(msg);
            break;
        }
        case 'challenge' : {
            let message = {type: 'challenge', player: sender, username: recipient};
            console.log(message);
            sendToAll(JSON.stringify(message));
            break;
        }
        case 'accept' : {
            let message =  {type: 'accept', player: sender, username: recipient};
            console.log(message);
            sendToAll(JSON.stringify(message));
            break;
        }
        case 'reject' : {
            let message =  {type: 'reject', player: sender, username: recipient};
            console.log(message);
            sendToAll(JSON.stringify(message));
            break;
        }
        case 'newGame' : {
            let game = model.Game.newGame();

            let username1 = '';
            let username2 = '';
            let opponentColor = undefined;

            if (json.youPlay === 'y') {
                username1 = recipient;
                username2 = sender;
                opponentColor = 'b';
            } else {
                username1 = sender;
                username2 = recipient;
                opponentColor = 'y';
            }
            games.push(game);

            let message = {type: 'newGame', youPlay: opponentColor, player: recipient, username: sender};

            sendToAll(JSON.stringify(message));

            // Selects a winner and sends the appropriate response to the sender and recipient.
            let winner = game.startGame();
            let senderWinner = undefined;
            let recipientWinner = undefined;
            if(winner.getType() === opponentColor) {
                senderWinner = false;
                recipientWinner = true;
            }else{
                senderWinner = true;
                recipientWinner = false;
            }
            let endMessage1 = {type: 'end', youWin: senderWinner, username: sender};
            let endMessage2 = {type: 'end', youWin:recipientWinner, username:recipient};

            sendToAll(JSON.stringify(endMessage1));
            sendToAll(JSON.stringify(endMessage2));
            break;
        }
        case 'keypress' : {
            let game = undefined;

            for (let i = 0; i < games.length; i++) {
                if (json.color === 'y') {
                    if (games[i].getYellowCycle().user === json.username && games[i].getBlueCycle().user === json.opponent)
                        game = games[i];
                } else {
                    if (games[i].getBlueCycle().user === json.username && games[i].getYellowCycle().user === json.opponent)
                        game = games[i];
                }
            }

            if (json.color === 'y') {
                game.getYellowCycle().setDirection(json.keycode);
            } else {
                game.getBlueCycle().setDirection(json.keycode);
            }
            break;
        }
        default : {
            console.log("Unknown message received from client of type "+msg.type);
        }
    }
}

/**
 * Sends a message to all clients.
 * Taken from Othello_server example on studres.
 */
function sendToAll(msg) {
    expressWs.getWss().clients.forEach(function(ws) {
        ws.send(JSON.stringify(msg));
    });
}