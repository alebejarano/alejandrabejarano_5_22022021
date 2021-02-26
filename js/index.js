let productsContainer = document.getElementById('productsContainer');

// for all the products to display in Teddies (index.html)
function getProducts() {
  ApiHelpers.get('http://localhost:3000/api/teddies') 
    .then((data) => {
      data.forEach(function (teddie) {
        const newProduct = document.createElement('div');
        newProduct.classList.add('col-sm-6', 'col-lg-4', 'mb-3', 'd-flex');
        newProduct.innerHTML =
          `<a href="productPreview.html?id=${teddie._id}">
                    <div class="card card-flex">
                        <img class="card-img-top" src="${teddie.imageUrl}" alt="ours en peluche">
                        <div class="card-body">
                            <p class="card-title text-center color-link">${teddie.name}</p>
                            <p class="d-none">${teddie._id}</p>
                            <p class="card-text text-center color-link">${teddie.price}&euro;</p>
                        </div> 
                    </div> 
                </a>    
            `;
        productsContainer.appendChild(newProduct);
      });
    })
}
getProducts();
