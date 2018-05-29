/**
 * Add all the computation and all the functionality of the website here.
 */

const Moltin = moltin.gateway({client_id: '99WMj74mT9o9bRHQqBswfFMyDrC8GqxHbX2ytpOsS7'}); //Authenticates Client with API

 //Sends messages to the server

 //Receive responses containing data from the server

 //Function that returms the list of items or store the list of items in an array.
async function retrieveProductData(){
    const products = await Moltin.Products.With(['main_image']).All();//This will wait for the promised product list to be returned.
    return products;
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
 