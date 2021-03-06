//to reset the errors so when the user corrects the input the err messeges disappears 
document.querySelectorAll('#form input').forEach(input => {
  input.addEventListener('change', event => {
    fieldIsValid(event.target);
  });
}); 

// to display the selected products to buy in the cart page
function displayCart() {
  let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
  let productContainer = document.getElementById('cartProducts');
  let totalPrice = 0;

  if (cartItems != null) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      const product = document.createElement('div');
      product.classList.add('row');
      product.innerHTML +=
        `<div class=" col-6 col-sm">
            <img src="${item.imageUrl}" width="100">
        </div>
        <div class="col-6 col-sm">
            <p class="teddie-name">${item.name}</p>
        </div>
        <div class="col-6 col-sm">
            <div class="btn-group btn-group-sm" role="group" aria-label="augmenter ou réduire la quantité">
                <button type="button" data-product="${item._id}" class="decrease btn btn-light">-</button>
                <button type="button" class="btn btn-light">${item.quantity}</button>
                <button type="button" data-product="${item._id}" class="increase btn btn-light">+</button>
            </div>
            <span class="ml-2"><i class="delete fas fa-times" data-product="${item._id}" title="supprimer"></i></span>
        </div>
        <div class="col-6 col-sm">
            ${item.price}&euro;
        </div>
        <hr class="line-break">
        `
      productContainer.appendChild(product);
      totalPrice += item.price * item.quantity;
    });

    document.querySelectorAll('.decrease').forEach(decrease => {
      decrease.addEventListener('click', () => {
        deleteItem(decrease.getAttribute('data-product'), 1);
        displayCart();
      })
    })

    document.querySelectorAll('.increase').forEach(increase => {
      increase.addEventListener('click', () => {
        addProduct(cartItems[increase.getAttribute('data-product')]);
        displayCart();
      })
    })

    document.querySelectorAll('.delete').forEach(deleteAll => {
      deleteAll.addEventListener('click', () => {
        deleteItem(deleteAll.getAttribute('data-product'), cartItems[deleteAll.getAttribute('data-product')].quantity);
      });
    });
  }
  // calculates the total price or indicates if there is no items in cart and if there is no items in cart the client form will not appear
  const totalPriceContainer = document.createElement('div');
  if (totalPrice > 0) {
    totalPriceContainer.classList.add('d-flex', 'justify-content-end', 'mr-5');
    totalPriceContainer.innerHTML +=
      `Total: ${totalPrice}&euro;`;
  } else {
    totalPriceContainer.classList.add('d-flex', 'justify-content-center', 'text-muted');
    totalPriceContainer.innerHTML +=
      `Votre panier est vide`;
    let clientContactForm = document.getElementById('client-contact-container');
    clientContactForm.style.display = 'none';
  }
  productContainer.appendChild(totalPriceContainer);
}
// to delete items in cart page
function deleteItem(itemId, quantityToDelete) {
  let productsInCart = localStorage.getItem('productsInCart');
  if (productsInCart != null) {
    let totalItems = localStorage.getItem('totalProducts');
    let totalPrice = localStorage.getItem('totalCost');

    productsInCart = JSON.parse(productsInCart);
    let productPrice = productsInCart[itemId].price;
    totalPrice = parseFloat(totalPrice);
    localStorage.setItem('totalProducts', totalItems - quantityToDelete);
    localStorage.setItem('totalCost', totalPrice - (productPrice * quantityToDelete));
    productsInCart[itemId].quantity -= quantityToDelete;
    if (productsInCart[itemId].quantity === 0) {
      delete productsInCart[itemId];
    }

    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
    displayCart();
    displayCartCounter();
  }
}
//once the form is valid it will collect the data: contact as an object and the id's of the items as an array to then be send to the api
function checkout(event) {
  event.preventDefault();
  if (formIsValid()) {
    let contact = {};
    document.querySelectorAll('#form input').forEach(input => {
      Object.assign(contact, {
        [input.getAttribute('name')]: input.value
      });
    });
    const cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    //data is the object that will be sent to the api
    const data = {
      contact: contact,
      products: Object.keys(cartItems)//it extracts only the keys of un object and returns an array. In productsInCart i passed as a key the id of each item
    }
    //send the data to the server and get a response with the order id that it redirects to the orderConfirmed page
    ApiHelpers.post('http://localhost:3000/api/teddies/order', data).then(response => {
      window.location.assign(window.location.origin + `/orderConfirmed.html?orderId=${response.orderId}`);
    })
  }
}
// to redirect the submit button to the order confirmation page calling the function checkout 
const formElement = document.getElementById('form');
formElement.addEventListener('submit', checkout);

displayCart();

// to loop and check for the errors, to validate at the end all  of the inputs
function formIsValid() {
  let formInputs = document.querySelectorAll('#form input');
  let numOfErrors = 0;
  
  formInputs.forEach(input => {
    if(!fieldIsValid(input)) {
      numOfErrors++;
    }
  });
  return numOfErrors === 0;
}
// to validate an specific input field with the help of regular expressions
// this function is call twice
function fieldIsValid(input) {
  const mailPattern = /^[a-z0-9-_.]+@[a-z0-9-]+\.[a-z]{2,4}$/i;
  const namePattern = /^[a-z-À-ÖØ-öø-ÿ ]+$/i;
  const textPattern = /^[-'#a-z0-9À-ÖØ-öø-ÿ ]+$/i;

  resetError(input);

  switch (input.id) {
    case 'lastName':
    case 'firstName':
      if (!input.value.match(namePattern)) {
        invalidateField(input, 'Champs invalide');
        return false;
      }
      break;
    case 'email':
      if (!input.value.match(mailPattern)) {
        invalidateField(input, 'Adresse email invalide. Ex adresse email valide : jhon@hotmail.com');
        return false;
      }
      break;
    case 'address':
    case 'city':
      if(!input.value.match(textPattern)) {
        invalidateField(input, 'Champs invalid ');
        return false;
      }
      break;
  }
  return true;
}
// if the input is not valid the error message and invalid class will appear
function invalidateField(input, message) {
  input.parentElement.classList.add('invalid');
  input.nextSibling.nextSibling.innerText = message;
}
// to reset the errror and remove class and message
function resetError(input) {
  input.parentElement.classList.remove('invalid');
  input.nextSibling.nextSibling.innerText = '';
}

