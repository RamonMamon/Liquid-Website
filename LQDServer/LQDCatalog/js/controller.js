/**
 * This will be used to control the entire application. 
 * This is where you will pass feedback from view to the model and vice versa.
 * This is also where you initialize the Single Page application.
 */

var controller = (function(){
    async function init(){
        initializeView();
        initializeNavBarButtons();
        initializeProducts();
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

var slideIndex = 0; // Current index of the slide.
var selectedID;

/**
 * Meant to be called once the nicotine strength is changed. 
 * Initializes the products in the products section once they have been retrieved from the server.
 * @param {int} nicStrength 
 */
function initializeProducts(){
    retrieveProductData().then(function(){ 
        // Waits for the product list to be retrieved before being called.
        viewSlide(slideIndex); // Sets the catalog as the initial slide.
    });
}

/**
 * Views the slide at the current index. If the index is at 0, the catalog 
 * will be previewed instead.
 * @param {Integer} increment The amount to increment the index
 */
function viewSlide(increment) {
    slideIndex += increment;

    var x = _3mgProducts.length;

    if(slideIndex < 0) slideIndex = x;
    else if (slideIndex > x) slideIndex = 0;

    // Hides the catalog if the index is not 0.
    if(slideIndex == 0){
        $("#catalog").toggleClass("hideSlide", false) 
        $("#productHolder").toggleClass("hideSlide",true)
    }
    else{
        $("#catalog").toggleClass("hideSlide", true);
        $("#productHolder").toggleClass("hideSlide",false)
        updateProducts( _3mgProducts, _6mgProducts, productImages, slideIndex-1);
        $(".dropbtn").html("Nicotine Strength"); // Resets the button.
    }
}

$(document).ready(function(){
    $(".3mgDrop").on('click', function(event){
        selectedID = event.target.id;
    })
    $(".6mgDrop").on('click', function(event){
        selectedID = event.target.id;
    })
});
function addProductToCart(){
    addToCart(selectedID).then(function(){
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
    passToCheckout(getCustomerDetails(), getAddress());
}