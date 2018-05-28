var offset;
var navbar;
var slideIndex = 1;
var productsList = [];


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
    productsList = sendProductsToView();
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

/*
Takes a product list and prints it on the products section of the page.
*/
 function viewProducts(productList){
    var newContent = $('#content').html("");
    var content = $('content');
    for(var i = num.zero; i <= productsList.length-1;i++)
    {
        var productID = "product" + i;
        var product = JSON.parse(localStorage.getItem(TaskID));
        
        var $div = $("<div>", {"id": productID, "class": "mySlides"});
        $div.append($("< div/>").addClass("label").html($("<h2 />").addClass("productName").html(product.name)));
        $div.append($("<img />").addClass("prouctphoto").html(product.photo));
        $div.append($("<div>").addClass("dropdown"));
        $div.append($("<a />").html("3mg"));
        $div.append($("<a />").html("6mg"));
        $div.append($("<p/>").html(product.description));
        $div.append($("<button />").addClass("button").html("Add to Cart"));
        $div.append($("<div/>")).addClass("numbertext").html( (i + 1) + "/" + productList.length);
    }
 }

