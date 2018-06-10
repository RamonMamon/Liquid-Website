var offset;
var navbar;
var slideIndex = 1;

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

/*
Sets a new offset whenever the window is resized.
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
    showSlides(slideIndex);
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
    $("#content").css("margin-left") = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    $("#mySidenav").width("0px");
    $("#content").css("margin-left") = "0";
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    console.log(slides.length);
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex-1].style.display = "block";  
}

  /**
 * PRODUCTS FUNCTIONALITY
 */

/**
 * Takes an object list containing the data of the products including the images that correspond to each product.
 * @param {Object} productList Contains each product from the catalog.
 * @param {Object} productImages Contains the images of each product from the catalog.
 */
function updateProducts(productList, productImages){
    var newMySlides = $('#slideshowcontainer');
    var mySlides = $('#slideshowcontainer');
    console.log("Retrieve Products", productList.length);
    console.log("File Image", productImages);

    for(var i = 0; i <= productList.length-1;i++)
    {
        var product = productList[i];

        var $nicotineDropdown = $("<div>",{"class":"dropdown","id": dropDownContentID});
        $nicotineDropdown.append($("<button>").addClass("dropbtn").html("Nicotine Strength"));
        var dropDownContentID = product.id + "strength";

        var $dropdownContent = $("<div>",{ "class": "dropdown-content"});
        $dropdownContent.append($("<a>").html("3 mg"));
        $dropdownContent.append($("<a>").html("6 mg"));
        $nicotineDropdown.append($dropdownContent);

        var $div = $("<div>", {"id": product.id, "class": "mySlides"});
        $div.append($("<div>").html($("<h2 />").addClass("productName").html(product.name)));
        $div.append($("<img >").addClass("productphoto").attr("src",productImages[i].link.href));
        
        $div.append($nicotineDropdown);
        $div.append($("<button>").addClass("button").html("Add to Cart"));
        $div.append($("<p>").html(product.description));
        $div.append($("<div>").addClass("numbertext").html( (i + 1) + "/" + productList.length));
        
        newMySlides.append($div);
    }
}

/**
 * Updates the cart in the html file.
 * @param {Object} cart Contains all the items in the cart.
 */
function updateCart(cart){

}

/**
 * Creates checkout form on the HTML page.
 */
function checkoutForm(){

}

/**
 * 
 */
function getCustomerDetails(){
    
}

/**
 * Shows a form for the user to fill in to retrieve the user details.
 */
function getAddress(){

}


