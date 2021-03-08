// products container div in index.html
let productsContainer = document.getElementById('productsContainer');

// for all the products to display in Teddies (index.html)
function getProducts() {
  ApiHelpers.get('http://localhost:3000/api/teddies') 
    .then((data) => {
      data.forEach(function (teddie) {
        const newProduct = document.createElement('div');
        newProduct.classList.add('col-sm-6', 'col-lg-4', 'mb-3', 'd-flex');
        newProduct.innerHTML =
          `<div class="card card-flex">
            <a href="productPreview.html?id=${teddie._id}">
              <img class="card-img-top" src="${teddie.imageUrl}" alt="ours en peluche">
            </a> 
              <div class="card-body">
                <a href="productPreview.html?id=${teddie._id}">
                  <p class="card-title text-center color-link">${teddie.name}</p>
                </a>   
                <p class="d-none">${teddie._id}</p>
                <p class="card-text text-center color-link">${teddie.price}&euro;</p>
              </div> 
          </div> 
            `;
        productsContainer.appendChild(newProduct);
      });
    })
}
getProducts();
