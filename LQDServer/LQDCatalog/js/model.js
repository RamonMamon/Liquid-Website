/**
 * Add all the computation and all the functionality of the website here.
 */

const Moltin = moltin.gateway({client_id: '99WMj74mT9o9bRHQqBswfFMyDrC8GqxHbX2ytpOsS7'}); //Authenticates Client with API

var products; // Contains all the data of each product
var productImages; // Contains the images for each product

 /**
  * Function that retrieves the specified list of items from the catalog.
  * @param {Integer} nicStrength is the specified strength of the nicotine.
  */
async function retrieveProductData(nicStrength){
    var nicStrength = (nicStrength == 6) ? nicStrength = '*6mg' : nicStrength = '*3mg'; //Nicotine strength

    const productData = await Moltin.Products.Filter({like: {sku: nicStrength}}).With(['main_image']).All();//This will wait for the promised product list to be returned.
    productImages = productData.included.main_images;
    products = productData.data;
}

//     console.log('authenticated', response);
//     Moltin.Products.Filter({like:{sku:'BR_'}}).All().then(products => {
//         // Do something
//         console.log("3mg Products" , products);
//     });
//     // console.log(products.data[0].id);

//     const blueRazz = Moltin.Products.Get('c3604c08-c239-4ff2-9f02-6bbd47e2724f').then(products => {
//         console.log(products)
//     });
 



/**
 * Adds a product to the cart.
 */
// Moltin.Cart().AddProduct(product.id, 1).then((item) => {
//     alert(`Added ${item.name} to your cart`);
// });

// const cart = Moltin.Cart().Items(); //Retrieves the contents of the cart

/**
 * Converts the contents of the cart to an order.
 */
//START
// const address = {
//     first_name: 'John',
//     last_name: 'Doe',
//     line_1: '123 Sunny Street',
//     line_2: 'Sunnycreek',
//     county: 'California',
//     postcode: 'CA94040',
//     country: 'US'
//   };
  
// const customer = {
//     email: 'john@doe.co',
//     name: 'John Doe'
// };
  
// Moltin.Cart().Checkout(customer, address); 
//END

// Moltin.Orders.Payment(order.id, {
//     gateway: 'stripe',
//     method: 'purchase',
//     first_name: 'John',
//     last_name: 'Doe',
//     number: '4242424242424242',
//     month: '02',
//     year: '2020',
//     verification_value: '123'
// });
 