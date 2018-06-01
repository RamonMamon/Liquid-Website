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
  * NOTES FOR EMMAN
  * 
  * Don't create too many unnecessary functions. In the controller file you created a function that makes the call viewProducts(retrieveProducts). I get what you're trying to do
  * but that just creates an extra function that isn't needed since that's the point of the init function in the first place. I've moved it into the init function inside the controller. 
  * Creating functions is good for code that will be reused, too long, to improve documentability, and user readability. The last reason is why smart naming is important. It allows your code
  * to be understood easier which is very important when working in groups. If smart naming is not possible at least make comments to indicate what they do and how they work. This is one of the
  * reasons why my markers in the UK didn't grade me as well as my other peers, because my documentation needed some improvements.
  * 
  * I know I haven't taught you the CMV structure as in-depth as I should have and you haven't formally learned it so I understand, but here are some things to keep in mind. 
  * Keep each functionality strictly in each type of file that it's supposed to be in. That is, if you have something that needs to be calculated and is part of the functionality of the website, then keep
  * it in the model file. For example, the retrieveProductData() function retrieves data from the Moltin Database and is returned by the function to be used elsewhere. Basically the model should keep all the calculations
  * and complications that the user does not need to see. The Job of the View of the other hand, is everything we as programmers want the user to see. This includes forms that can be interacted with and 
  * the text and images that they can see. When you look back at my code from the task manager, you should also know that it's not perfect and there are some things that I could have done better. This feedback
  * from my professor is one of them. 
  * 
  * "MVC pattern has been used but I think
  * you’ve placed a lot functionality in the view
  * module that could have been better placed
  * in the controller." - Colin Alison
  * 
  * Don't make the same mistake I did with that while reading the view section of my code.
  * 
  * Lastly, the controller file is what brings both together and takes the user input from the view, and plugs it into the necessary functions in the model. This is the same for any data that comes from the model
  * and needs to be seen in the view.
  */


/**
 * Takes an object list containing the data of the products including the images that correspond to each product.
 * @param {Object} productList Contains each product from the catalog.
 */
function initializeProducts(productList, productImages){
    var newContent = $('#content').html("");
    var content = $('content');
    console.log("Retrieve Products", productList.length);
    console.log("File Image", productImages);



    for(var i = 0; i <= productList.length-1;i++)
    {
        var product = productList[i];
        
        var $div = $("<div>", {"id": product.id, "class": "mySlides"});
        $div.append($("<div/>").addClass("label").html($("<h2 />").addClass("productName").html(product.name)));
        $div.append($("<img />").addClass("productphoto").html(productImages[i].link.href));
        $div.append($("<div>").addClass("dropdown"));
        $div.append($("<a />").html("3mg"));
        $div.append($("<a />").html("6mg"));
        $div.append($("<p/>").html(product.description));
        $div.append($("<button />").addClass("button").html("Add to Cart"));
        $div.append($("<div/>")).addClass("numbertext").html( (i + 1) + "/" + productList.length);
    }
}

function updateCart(cart){

}

