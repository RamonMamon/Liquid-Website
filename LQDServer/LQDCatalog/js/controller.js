/**
 * This will be used to control the entire application. 
 * This is where you will pass feedback from view to the model and vice versa.
 * This is also where you initialize the Single Page application.
 */
var controller = (function(){
    async function init(){
        initializeView();
        initializeProducts();
        updateCart(); 
    }return {
        init: init
    }
})();

/**
 * These are the event handlers for most of the buttons on the client.
 */
$(document).ready(function(){
    $(".3mgDrop").on('click', function(event){
        selectedID = event.target.id;
    });
    $(".6mgDrop").on('click', function(event){
        selectedID = event.target.id;
    });

    var modal = $('.billinginformation');

    // Get the button that opens the modal
    var btn = $('#checkout');

    // The Close button
    var close = $(".close");

    // When the user clicks on the button, open the modal 
    btn.click(function() {
        if(userCart.data.length == 0){
            alert("Cannot checkout with an empty cart.");
            return;
        }
        modal.show()
    });

    // When the user clicks on <span> (x), close the modal
    close.click(function() {
        modal.removeAttr("style").hide();
    });

    // When the user clicks anywhere outside of the modal while the modal is open, close it
    $(window).click(function(event) {
        if ($(event.target)[0] == modal[0]) {
            modal.removeAttr("style").hide();
        }
    });

    $('#confirmbtn').click(function(event){
        /*
        Work on Error handling for the form.
         */
        checkout();
        event.preventDefault();
    })

    //Make an event handler for the remove product buttons.

    // Creates an event listener for all remove buttons inside the cart of
    $("#cartItems").on('click','.remove' , function(){
        removeProduct($(this).parent().parent().attr("id"));
    });
});


/**
 * Checkout form and modal.
 */


var slideIndex = 0; // Current index of the slide.
var selectedID;
var userCart;

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
        selectedID = null; // Resets the selected id whenever the slide is changed.
    }
}

function addProductToCart(){
    if(selectedID == null){
        alert("Please specify a nicotine strength.");
        return;
    }
    addToCart(selectedID).then(function(){
        updateCart();
        alert("Product has been added to your cart.")
    });
    //Can potentially reduce the lines of code like this
    //updateCart(addToCart(selectedID))
    //This will only work if I properly set up the add to cart function.
}

function removeProduct(productID){
    removeFromCart(productID).then(function(){
        updateCart();
        alert("Product has been removed from your cart.");
    });
}

function clearCart(){
    clearProducts().then(function(){
        updateCart();
        alert("Your cart has been cleared.");
    })
}

/**
 * Updates the users cart, then views it on the html file.
 */
async function updateCart(){
    userCart = await getCart();
    viewCart(userCart);
}

/**
 * Passes the user details from the view to the model.
 */
async function checkout(){
    await createOrder(getCustomerDetails(), getAddress());
}
