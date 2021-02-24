let products = [];


function getProducts() {
    fetch('http://localhost:3000/api/teddies')
    .then((res) => res.json())
    .then((data) => {
        let productsContainer = '';
        data.forEach(function(teddie){
            productsContainer +=
            `<div class="col-sm-6 col-lg-4 mb-3 d-flex">
                <div class="card card-flex">
                    <a href="#" class="product-preview"><img class="card-img-top" src="${teddie.imageUrl}"></a>
                    <div class="card-body">
                        <a href="#" class="product-preview color-link"><h3 class="card-title text-center">${teddie.name}</h3></a>
                        <p class="d-none">${teddie._id}</p>
                        <p class="card-text text-center">${teddie.price}&euro;</p>
                    </div> 
                </div>       
            </div>
            `;
        });
        document.getElementById('productsContainer').innerHTML = productsContainer;
        let productPreviews = document.querySelectorAll('.product-preview');
        console.log(productPreviews);
        productPreviews.forEach(preview => {
            preview.addEventListener('click', () => {
                console.log('Hi');
            })
        });
    })
}
getProducts();
