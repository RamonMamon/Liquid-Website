var csv = require('csv');
var obj = csv(); 
// gets the csv module to access the required functionality
​
//Product ID, Product Name, Description, Stock.
function product(productID, productName, description, stock) {
    this.productID = productID;
    this.productName = productName;
    this.description = description;
    this.stock = stock;
}; 
// Define the MyCSV object with parameterized constructor, this will be used for storing the data read from the csv into an array of MyCSV. You will need to define each field as shown above.
​
var csvData = [];
​
obj.from.path('../Database/stock.csv').to.array(function (data) {
    for (var index = 0; index < data.length; index++) {
        csvData.push(new product(data[index][0], data[index][1], data[index][2], data[index][3]));
    }
    console.log(csvData);
});