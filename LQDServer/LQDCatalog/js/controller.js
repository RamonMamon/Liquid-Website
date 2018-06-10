/**
 * This will be used to control the entire application. 
 * This is where you will pass feedback from view to the model and vice versa.
 * This is also where you initialize the Single Page application.
 */

var controller = (function(){
    async function init(){
        initializeView();
        initializeNavBarButtons();
        var nicStrength = 6;
        initializeProducts(nicStrength);
        updateCart(getCart()); //TODO
    }return {
        init: init
    }
})();

/**
 * This function will initialize the Navigation buttons found at the header of the page.
 */
function initializeNavBarButtons(){
    $("#aboutNav").click(function(){ 
        moveToAbout();
    });
    $("#productsNav").click(function(){ 
        moveToProducts();
    });
}

/**
 * Meant to be called once the nicotine strength is changed. 
 * Initializes the products in the products section once they have been retrieved from the server.
 * @param {int} nicStrength 
 */
function initializeProducts(nicStrength){
    retrieveProductData(nicStrength).then(function(){
        updateProducts(products, productImages);// Waits for the product list to be retrieved before being called.
    });
}

function addProductToCart(productID){
    addToCart(productID).then(function(){
        updateCart(getCart());
    });
}

function removeProduct(productID){
    removeFromCart(productID).then(function(){
        updateCart(getCart());
    });
}

/**
 * Passes the user details from the view to the model.
 */
function checkout(){
    passToCheckout();
}