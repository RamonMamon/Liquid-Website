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

function blueStrength(n)
{
    document.getElementById("bRazz").innerHTML = n + " mg";
}

function pinkStrength(n)
{
    document.getElementById("pink").innerHTML = n + " mg";
}

function tanStrength(n)
{
    document.getElementById("tDream").innerHTML = n + " mg";
}

function mintStrength(n)
{
    document.getElementById("mChip").innerHTML = n + " mg";
}
/**
 * PRODUCTS FUNCTIONALITY
 */

/*
Takes a product list and prints it on the products section of the page.
*/
 function viewProducts(productList){

 }

