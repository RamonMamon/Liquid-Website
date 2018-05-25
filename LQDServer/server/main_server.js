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

/**
 * Sends the index.html file to the client.
 */
app.get('/', function(req, res) {
    console.log('Request Type: ', req.method);
    res.status(OK);
    res.sendFile(path.resolve(clientDirectory, './index.html'));
});

//Implement Admin page request here

// Logs any server-side errors to the console and send 500 error code.
app.use(function (err, req, res) {
    // TODO: Add a response to the error.
    console.error("Error: " + err.stack);
    req.status(internalServerError).send('Something broke!');
});

app.listen(port, function(){
    console.log('Server running, access the website by going to http://staylqd.com/');
});

var csv = require('csv');
// gets the csv module to access the required functionality

//Product ID, Product Name, Description, Stock.
function product(productID, productName, description, stock) {
    this.productID = productID;
    this.productName = productName;
    this.description = description;
    this.stock = stock;
}; 
// Define the MyCSV object with parameterized constructor, this will be used for storing the data read from the csv into an array of MyCSV. You will need to define each field as shown above.

var csvData = [];

var parser = csv.parse({delimiter: ','});
var generator = csv.generate({seed: 1, columns: 4, length: 5});
var transformer = csv.transform(function(data){
  return data.map(function(value){return value.toUpperCase()});
});
var stringifier = csv.stringify();
 
generator.on('readable', function(){
  while(data = generator.read()){
    parser.write(data);
  }
});
 
parser.on('readable', function(){
  while(data = parser.read()){
    transformer.write(data);
  }
});
 
transformer.on('readable', function(){
  while(data = transformer.read()){
    stringifier.write(data);
  }
});
 
stringifier.on('readable', function(){
  while(data = stringifier.read()){
    // process.stdout.write(data);
  }
});
