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
function addProduct(product) {
  let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
  let totalItems = localStorage.getItem('totalProducts');
  let totalPrice = localStorage.getItem('totalCost');

  if (totalItems != null) {
    totalItems++;
  }  else {
    totalItems = 1;
  }

  if (cartItems != null) {
    if (cartItems[product._id] === undefined) {
      cartItems = {
        ...cartItems,
        [product._id]: {
          ...product,
          quantity: 1
        }
      }
    } else {
      cartItems[product._id].quantity += 1;
    }
  } else {
    cartItems = {
      [product._id]: {
        ...product,
        quantity: 1
      }
    }
  }
  if(totalPrice != null) {
    totalPrice = parseInt(totalPrice);
    localStorage.setItem('totalCost', totalPrice + product.price);
} else {
    localStorage.setItem('totalCost', product.price);
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