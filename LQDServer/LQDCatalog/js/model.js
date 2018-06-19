/**
 * Add all the computation and all the functionality of the website here.
 */

const Moltin = moltin.gateway({client_id: '99WMj74mT9o9bRHQqBswfFMyDrC8GqxHbX2ytpOsS7'}); //Authenticates Client with API

var _3mgProducts; // Contains all the 3mg data of each product
var _6mgProducts; // Contains all the 6mg data of each product
var productImages; // Contains the images for each product

 /**
  * Function that retrieves the data of the items with the specified Nicotine strength from the catalog.
  */
async function retrieveProductData(){
    var productData_3mg = await Moltin.Products.Filter({like: {sku: '*3mg'}}).With(['main_image']).All();//This will wait for the promised product list to be returned.
    var productData_6mg = await Moltin.Products.Filter({like: {sku: '*6mg'}}).All();

    // Gets the images of each Product
    productImages = productData_3mg.included.main_images; 
    // Stores the data of each product based off the nicotine strength.
    _3mgProducts = productData_3mg.data; 
    _6mgProducts = productData_6mg.data;
}

async function addToCart(productID){
    await Moltin.Cart().AddProduct(productID, 1);
}

async function removeFromCart(productID){
    await Moltin.Cart().RemoveItem(productID, 1);
}

async function clearProducts(){
    await Moltin.Cart().Delete();
}

/**
 * Returns an array of items from the lqd catalog on moltin.
 */
function getCart(){
    return Moltin.Cart().Items().then((cart) =>{
        console.log(cart);
        return cart;
    });
}

/**
 * Passes the users information to the checkout function and returns
 * an order.
 * @param {Object} customer 
 * @param {Object} address 
 */
function createOrder(customer, address){
    //Get the address and customer details from the view and pass them onto the Checkout function.
    return Moltin.Cart().Checkout(customer, address).then((order) =>{
        console.log(order);
        alert("Your order has been placed");
        return order;
    });
}

function makePayment(order){
​
    const payment = {
        gateway: 'manual',
        method: 'authorize'
    }
    ​
    Moltin.Orders.Payment(order.id, payment).then(() => {
        var paymayaOrder = convertOrder(order);

    })
}

/**
 * Converts moltin order to an appropriate body request for the paymaya checkout API.
 * @param {Object} order 
 */
function convertOrder(order){
    var paymayaOrder = {
        "totalAmount": order.meta.display_price.with_tax.currency,
        "value": meta.display_price.with_tax.amount,
    }
}

function sendOrder(order){
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://pg-sandbox.paymaya.com/checkout/v1/checkouts", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(order));
    var response = JSON.parse(xhttp.responseText);
}