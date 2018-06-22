let express = require('express');
let app = express();
let bodyParser = require('body-parser');
var path = require("path");
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
app.get('/', sendIndex);

function sendIndex(req,res){
    console.log('Request Type: ', req.method);
    res.status(OK);
    res.sendFile(path.resolve(clientDirectory, './index.html'));
}

/**
 * Create an app.post that receives the order id and use it to capture
 * the order and mark the transaction as completed.
 */
app.get('/capture/:orderid',function(req,res){
    var data = req.params;
    console.log("Order id " + data.orderid)
    
    // capture(data.orderid, res);
    sendIndex(req,res);
});

/**
 *  WORK IN PROGRESS
 * @param {String} orderid 
 * @param {object} res 
 */
async function capture(orderid, res){   
    await Moltin.Orders.Transactions(orderid).then(transactions => { 
        Moltin.Orders.Payment(transactions.data[0].id,{
            gateway:'manual',
            method:'capture'
        }).then(()=>{
            console.log("Capturing transaction of " + orderid + "...");
    

        // 
        //     // Do something
        //     console.log(transactions);
        //     var transactionid = transactions.data[0].id;
        //     console.log(transactionid)
        //     var link = "https://api.moltin.com/v2/orders/"+ orderid+ "/transactions/" +  transactionid +"/capture";
        //     console.log(link);
        //     var xhttp = new XMLHttpRequest();
        //     xhttp.open("POST", link, false);
        //     // xhttp.setRequestHeader("Authorization", "Bearer " + "99WMj74mT9o9bRHQqBswfFMyDrC8GqxHbX2ytpOsS7");
        // }).then(function(){
        //     res.send("Capture complete");
        // }).catch(function(err){
        //     console.log(err);
        // });

        }).catch(function(err){
            console.log(err);
            res.send(err.errors[0])
        });
    });
}

// Logs any server-side errors to the console and send 500 error code.
app.use(function (err, req, res) {
    // TODO: Add a response to the error.
    console.error("Error: " + err.stack);
    req.status(internalServerError).send('Something broke!');
});

app.listen(port, function(){
    console.log('Server running, access the website by going to http://staylqd.com/');
    console.log(Moltin);
});

//Implement Admin page request here

//Create an error handler that deals with multiple running instances of the server.
