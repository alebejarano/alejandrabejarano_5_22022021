// A class to interact with the API's
class ApiHelpers {
  // to get the api data
  static get = async (url) => {
    try {
      let res = await fetch(url);
      if (res.ok) {
        let data = await res.json();
        return data;
      } else {
        console.log(`Une erreur s'est produite: ${res.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
// to add the selected product to the cart
function addProduct(productId) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if(cartItems != null) {

      if(cartItems[productId] == undefined) {
          
          cartItems = {
              ...cartItems,
              [productId]: {
                  quantity: 1
              }
          }
      } else {
          cartItems[productId].quantity += 1;
      }
  } else {
      cartItems = {
          [productId]: {
              quantity: 1
          }
      }
  }
  localStorage.setItem('productsInCart', JSON.stringify (cartItems));
}