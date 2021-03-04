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
    totalPriceContainer.classList.add('d-flex', 'justify-content-end', 'mr-5');
    totalPriceContainer.innerHTML +=
      `Total: ${totalPrice}&euro;`;
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
displayCart();
