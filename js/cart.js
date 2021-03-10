// to display the selected products to buy
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
        `<div class=" col col-sm">
            <img src="${item.imageUrl}" width="100">
        </div>
        <div class="col col-sm">
            <p class="teddie-name">${item.name}</p>
        </div>
        <div class="col col-sm">
            <div class="btn-group btn-group-sm" role="group" aria-label="augmenter ou réduire la quantité">
                <button type="button" data-product="${item._id}" class="decrease btn btn-light">-</button>
                <button type="button" class="btn btn-light">${item.quantity}</button>
                <button type="button" data-product="${item._id}" class="increase btn btn-light">+</button>
            </div>
            <span class="ml-2"><i class="delete fas fa-times" data-product="${item._id}" title="supprimer"></i></span>
        </div>
        <div class="col col-sm">
            ${item.price}&euro;
        </div>
        <hr class="line-break">
        `
      productContainer.appendChild(product);
      totalPrice += item.price * item.quantity;
    });

    const totalPriceContainer = document.createElement('div');
    if (totalPrice > 0) {
      totalPriceContainer.classList.add('d-flex', 'justify-content-end', 'mr-5');
      totalPriceContainer.innerHTML +=
        `Total: ${totalPrice}&euro;`;
    } else {
      totalPriceContainer.classList.add('d-flex', 'justify-content-center', 'text-muted');
      totalPriceContainer.innerHTML +=
        `Votre panier est vide`;
    }
    productContainer.appendChild(totalPriceContainer);


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
// to redirect the submit button to the order confirmation page 
const formElement = document.getElementById('form');
formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  if (formIsValid()) {
    let contact = {};
    document.querySelectorAll('#form input').forEach(input => {
      Object.assign(contact, {
        [input.getAttribute('name')]: input.value
      });
    });
    const cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    const data = {
      contact: contact,
      products: Object.keys(cartItems)
    }
    ApiHelpers.post('http://localhost:3000/api/teddies/order', data).then(response => {
      console.log(response);
      window.location.assign(window.location.origin + '/orderConfirmed');
    })
  }
});

displayCart();

// regular expressions for the form validation in cart page
function formIsValid() {
  const form = document.getElementById('form');
  let formInputs = document.querySelectorAll('#form input');
  console.log(formInputs);
  let mailInput = document.getElementById('email');
  let numOfErrors = 0;
  const mailPattern = /^[a-z0-9.-_]+@[a-z0-9-]+\.[a-z]{2,4}$/i;
  const namePattern = /^[a-z- ]+$/i;
  const textPattern = /^[-'a-zÀ-ÖØ-öø-ÿ ]+$/i;


  formInputs.forEach(input => {
    switch (input.id) {
      case 'lastName':
      case 'firstName':
        if (!input.value.match(namePattern)) {
          invalidateField(input, 'Champs invalide');
          numOfErrors++;
        }
        break;
      case 'email':
        if (!mailInput.value.match(mailPattern)) {
          invalidateField(input, 'Adresse email invalide. Ex adresse email valide : jhon@hotmail.com');
          numOfErrors++;
        }
        break;
      case 'address':
      case 'city':
        if(!input.value.match(textPattern)) {
          invalidateField(input, 'Champs invalid ');
        }
        break;
    }
  });
  return numOfErrors === 0;
}
// if the input is not valid the error message and invalid class will appear
function invalidateField(input, message) {
  input.parentElement.classList.add('invalid');
  input.nextSibling.nextSibling.innerText = message;
}
