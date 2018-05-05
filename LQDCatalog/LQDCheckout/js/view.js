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

window.onload = function(){
    var targetOffset = $("#userCart").offset().top - 40;
    $('html,body').animate({scrollTop: targetOffset}, 1000); 
}

function initializeView(){
    navbar = $("#navbar");
    offset = navbar.offset(); //Gets the current position of the navbar. 
}

