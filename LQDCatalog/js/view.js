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

/*
Sets a new offset whenever the window is resized.
*/
$(window).resize(function(){
    offset = navbar.offset();
});

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
    $("#content").css("margin-left") = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    $("#mySidenav").width("0px");
    $("#content").css("margin-left") = "0";
}

/**
 * PRODUCTS FUNCTIONALITY
 */

/*
Takes a product list and prints it on the products section of the page.
*/
 function viewProducts(productList){

 }