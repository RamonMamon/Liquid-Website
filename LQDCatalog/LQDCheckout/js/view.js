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

function initializeView(){
    navbar = $("#navbar");
    offset = navbar.offset(); //Gets the current position of the navbar. 
}

/**
 * Contains all the interaction between the user and the application.
 */
background-color: rgba(51,51,51, 1);
overflow: hidden;
position: relative;
