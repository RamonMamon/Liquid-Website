/**
 * Add all the computation and all the functionality of the website here.
 */

const Moltin = moltin.gateway({client_id: '99WMj74mT9o9bRHQqBswfFMyDrC8GqxHbX2ytpOsS7'}); //Authenticates Client with API

var products; // Contains all the data of each product
var productImages; // Contains the images for each product

 /**
  * Function that retrieves the data of the items with the specified Nicotine strength from the catalog.
  * @param {Integer} nicStrength is the specified strength of the nicotine.
  */
async function retrieveProductData(nicStrength){
    var nicStrength = (nicStrength == 6) ? nicStrength = '*6mg' : nicStrength = '*3mg'; //Nicotine strength

    const productData = await Moltin.Products.Filter({like: {sku: nicStrength}}).With(['main_image']).All();//This will wait for the promised product list to be returned.

    productImages = productData.included.main_images; // Gets the images of each Product
    products = productData.data;// Stores the data of each product.
}

function addToCart(productID){
    Moltin.Cart().addProduct(productID).then((item) => {
        alert(item.name + " has been added to your cart.");
    });
}

function removeFromCart(productID){
    Moltin.Cart().removeProduct(productID).then((item) =>{
        alert(item.name + " has been removed from your cart.");
    });
}

/**
 * Returns an array of items from the lqd catalog on moltin.
 */
function getCart(){
    return Moltin.Cart().getItems();
}

/**
 * 
 * @param {Object} customer 
 * @param {Object} address 
 */
function passToCheckout(customer, address){
    //Get the address and customer details from the view and pass them onto the Checkout function.
    //Moltin.Cart().Checkout(customer, address);
}