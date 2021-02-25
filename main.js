let products = [];

// for all the products to display in Teddies (index.html)
function getProducts() {
    fetch('http://localhost:3000/api/teddies')
    .then((res) => res.json())
    .then((data) => {
        let productsContainer = '';
        data.forEach(function(teddie){
            productsContainer +=
            `<div class="col-sm-6 col-lg-4 mb-3 d-flex">
                <a href="productPreview.html?id=${teddie._id}">
                    <div class="card card-flex">
                        <img class="card-img-top" src="${teddie.imageUrl}" alt="ours en peluche">
                        <div class="card-body">
                            <p class="card-title text-center color-link">${teddie.name}</p>
                            <p class="d-none">${teddie._id}</p>
                            <p class="card-text text-center color-link">${teddie.price}&euro;</p>
                        </div> 
                    </div> 
                </a>          
            </div>
            `;
        });
        document.getElementById('productsContainer').innerHTML = productsContainer;
    })
}
// to display the selected product in the product preview page
function getSingleProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    fetch(`http://localhost:3000/api/teddies/${productId}`)
    .then((res) => res.json())
    .then((teddie) => {
        let preview = `
        <div class="card mb-3">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img  class="card-img" src="${teddie.imageUrl}" alt="ours en peluche">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title teddie-name">${teddie.name}</h5>
                        <p class="card-text">${teddie.description}</p>
                        <p class="card-text">${teddie.price}&euro;</p>
                        <p class="card-text"><small class="text-muted">Choix des Coleurs: ${teddie.colors}</small></p>
                        <button type="button" class="btn  btn-light  py-1 px-3 product-preview">AJOUTER AU PANIER</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        document.getElementById('preview').innerHTML = preview; 
        let addToCart = document.querySelectorAll('.product-preview');
        console.log(addToCart);
        addToCart.forEach(product => {
            product.addEventListener('click', () => {
                console.log('Hi');
            })
        });
    });
}
