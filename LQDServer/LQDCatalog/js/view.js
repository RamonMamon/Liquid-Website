var offset;
var navbar;

/**
 * When the user scrolls the page past the navbars offset, the navbar will
 * stick to the top of the screen.
 */
window.onscroll = function () { 
    if ($(document).scrollTop() >= offset.top) {
        navbar.addClass("sticky")
    } else {
        navbar.removeClass("sticky");
    } 
};

/** 
 * Sets a new offset whenever the window is resized.
 */
$(window).resize(function(){
    offset = navbar.offset();
});

/**
 * This function will initialize the default settings of the page.
 */
function initializeView(){
    navbar = $("#navbar");
    offset = navbar.offset(); //Sets the current position of the navbar. 
}

function moveToAbout(){
    //Scrolls the page down to the about section.
    var targetOffset = $("#about").offset().top - 40;
    $('html,body').animate({scrollTop: targetOffset}, 1000); 
}

function moveToProducts(){
    //Scrolls down page to the products section.
    var targetOffset = $("#products").offset().top - 40;
    $('html,body').animate({scrollTop: targetOffset}, 1000); 
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    $("#mySidenav").width("250px");
    $("#content").css("margin-left","250px");
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    $("#mySidenav").width("0px");
    $("#content").css("margin-left", "0");
}


/**
 * PRODUCTS FUNCTIONALITY
 */


function updateProducts(_3mgProducts, _6mgProducts, productImages, index){
    $(".productName").html(_3mgProducts[index].name);
    $(".productphoto").attr("src",productImages[index].link.href);
    $(".3mgDrop").attr("id", _3mgProducts[index].id);
    $(".6mgDrop").attr("id", _6mgProducts[index].id);
    $(".product-description").html(_3mgProducts[index].description);
    var numText = (index+1) + "/" + _3mgProducts.length;
    $(".number-text").html(numText);
}

/**
 * Updates the cart in the html file.
 * @param {Object} cart Contains all the items in the cart.
 */
function viewCart(cart){
    var cartItems = $('#cartItems');
    var cartData = cart.data;
    
    cartItems.html(""); // Resets the cart
    for(var i = 0; i < cartData.length; i++){
        var product = cartData[i];
        var link = cartData[i].image.href;
        // Sets the strength based off the sku.
        var strength = (product.sku.indexOf("3mg") >= 0)? "3mg" : "6mg"; 
        var $newItem = $("<div>",{"id":product.id,"class":"inCart"});
        var itemdIMG =$("<img>").addClass("cartImage").attr("src",link);
        var itemdescription = $("<p>").html(strength + ", " + product.name);
        itemdescription.append(itemdIMG);

        $newItem.append(itemdescription);
        cartItems.append($newItem);
    }
    
}

/**
 * Returns a customer object based off the details of the checkout form.
 */
function getCustomerDetails(){
    var custName = $('#firstName').val().trim() + ' ' + $('#lastName').val().trim();
    return {
        email: $('#email').val(),
        name: custName
    };
}

/**
 * Takes the customers Billing information from the form.
 */
function getAddress(){
    return {
        first_name: $('#firstName').val(),
        last_name: $('#lastName').val(),
        line_1: $('#address1').val(),
        line_2: $('#address2').val(),
        city: $('#city').val(),
        county: $('#state').val(),
        postcode: $('#zipcode').val(),
        country: 'Philippines'
      };
}

function selectNicotineStrength(strength){
    var nicStrength = strength + " mg";
    $(".dropbtn").html(nicStrength);
}



