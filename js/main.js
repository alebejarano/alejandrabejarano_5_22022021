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
  let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
  console.log(cartItems);
  let totalItems = localStorage.getItem('totalProducts');

  if (totalItems != null) {
    totalItems++;
  }  else {
    totalItems = 1;
  }

  if (cartItems != null) {
    if (cartItems[productId] === undefined) {
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
  localStorage.setItem('totalProducts', totalItems);
  displayCartCounter();
}
// to handle the display of the cart number items that appears in the cart item on the header section
function displayCartCounter() {
  let counterBubble = document.getElementById('items-in-cart');
  let totalItems = localStorage.getItem('totalProducts');
  if (totalItems != null && totalItems > 0) {
    counterBubble.innerText = totalItems;
    counterBubble.style.display = 'flex';
  } else {
    counterBubble.style.display = 'none';
  }
}
displayCartCounter();