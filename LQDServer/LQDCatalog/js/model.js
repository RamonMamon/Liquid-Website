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
    var productData_6mg = await Moltin.Products.Filter({like: {sku: '*6mg'}}).With(['main_image']).All();

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

async function makePayment(order){

    var payment = {
        gateway: 'manual',
        method: 'authorize'
    }
    console.log(order.data.id);
    //THIS APPARENTLY RETURNS A TRANSACTIONID
    Moltin.Orders.Payment(order.data.id, payment).then(() => {
        var paymayaOrder = convertOrder(order);
        console.log(paymayaOrder);
        sendOrder(paymayaOrder);
        alert(this);
    })
    
}

function capturePayment(orderid){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://staylqd.com/capture" + "/" + orderid, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    
    var response = JSON.parse(xhttp.responseText);
}

/**
 * Converts the users cart to a paymaya items object.
 * @param {Object} order Unconverted order object from moltin
 */
function convertUserCart(order){
    var items = [];
    var length = order.data.relationships.items.data.length;
    for(var i = 0; i < length; i++){
        var cartItem = userCart.data[i];
        var item = {
            "name": cartItem.name,
            "code": cartItem.sku,
            "description": cartItem.description,
            "quantity": cartItem.quantity,
            "totalAmount": {
                // Gets the display price without the currency symbol.
                "value": cartItem.meta.display_price.with_tax.value.formatted.substr(1)
            }
        }
        items.push(item); // Adds an item to the array
    }
    
    return items;
}

/**
 * Converts moltin order to an appropriate body request for the paymaya checkout API.
 * @param {Object} order Unconverted order object from moltin
 */
function convertOrder(order){
    var items = convertUserCart(order);
    var paymayaOrder = {
        "totalAmount":{
            "currency" : order.data.meta.display_price.with_tax.currency,
            //Gets the display price without the currency symbol.
            "value": order.data.meta.display_price.with_tax.formatted.substr(1),
        },
        "buyer":{
            "firstName": order.data.shipping_address.first_name,
            "lastName": order.data.shipping_address.last_name,
            "contact": {
              "email": order.data.customer.email
            }
        },
        "shippingAddress":{
            "line1": order.data.shipping_address.line_1,
            "line2": order.data.shipping_address.line_2,
            "city": order.data.shipping_address.city,
            "state": order.data.shipping_address.county,
            "zipCode": order.data.shipping_address.postcode,
            "countryCode": order.data.shipping_address.country
        },
        "items":items,
        "redirectUrl":{
            "success": "http://www.staylqd.com/",
            "failure": "http://www.staylqd.com/",
            "cancel": "http://www.staylqd.com/"
        },
        "requestReferenceNumber": order.data.id,
    }
    return paymayaOrder;
}

/**
 * Sends the paymaya order to retrieve the checkout.
 * @param {Object} order 
 */
function sendOrder(order){
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://pg-sandbox.paymaya.com/checkout/v1/checkouts", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "Basic " + btoa("pk-zkE0dIHQuDQEdWXJM547lhyX8IXLJRmpQ2tnmVIS5eo:sk-vb27oxKsTzWTAiil0zvu8aflo4I3h5cvcVCa0HdVyrt"));
    xhttp.send(JSON.stringify(order));
    
    var response = JSON.parse(xhttp.responseText);
    console.log(response);
    window.location.replace(response.redirectUrl);
}