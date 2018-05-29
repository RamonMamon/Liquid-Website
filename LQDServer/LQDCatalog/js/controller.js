/**
 * This will be used to control the entire application. 
 * This is where you will pass feedback from view to the model and vice versa.
 * This is also where you initialize the Single Page application.
 */

var controller = (function(){
    async function init(){
        initializeView();
        initializeNavBarButtons();
        initializeProducts(await retrieveProductData());// Waits for the product list to be retrieved before being called.
    }return {
        init: init
    }
})();

/**
 * This function will initialize the Navigation buttons found at the header of the page.
 */
function initializeNavBarButtons(){
    $("#aboutNav").click(function(){ 
        moveToAbout();
    });
    $("#productsNav").click(function(){ 
        moveToProducts();
    });
}