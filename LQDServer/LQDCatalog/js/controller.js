/**
 * This will be used to control the entire application. 
 * This is where you will pass feedback from view to the model and vice versa.
 * This is also where you initialize the Single Page application.
 */

/**
 * The module that initializes the SPA.
 */



var controller = (function(){
    function init(){
        initializeView();
        initializeNavBarButtons();
        retrieveProducts();
    }return {
        init: init
    }
})();

function initializeNavBarButtons(){
    $("#aboutNav").click(function(){ 
        moveToAbout();
    });
    $("#productsNav").click(function(){ 
        moveToProducts();
    });
}

function sendProductsToView(){
    viewProducts(retrieveProducts());
}
