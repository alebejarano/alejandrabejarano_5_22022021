let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
let productContainer = document.getElementById('cartProducts');
let totalPrice = 0;

if (cartItems != null) {
  Object.values(cartItems).map(item => {
    const product = document.createElement('div');
    product.classList.add('row');
    product.innerHTML +=
      `<div class=" col col-sm">
            <img src="${item.imageUrl}" width="100">
        </div>
        <div class="col col-sm">
            <p class="">${item.name}</p>
        </div>
        <div class="col col-sm">
            <div class="btn-group btn-group-sm" role="group" aria-label="augmenter ou réduire la quantité">
                <button type="button" class="btn btn-light">-</button>
                <button type="button" class="btn btn-light">0</button>
                <button type="button" class="btn btn-light">+</button>
            </div>
            <span class="ml-2"><i class="fas fa-times" title="supprimer"></i></span>
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
}
