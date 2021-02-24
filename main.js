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
                    <img class="card-img-top" src="${teddie.imageUrl}">
                    <div class="card-body">
                        <h3 class="card-title">${teddie.name}</h3>
                        <p class="id-productsList">${teddie._id}</p>
                        <p class="card-text">${teddie.price}&euro;</p>
                    </div> 
                </div>       
            </div>
            `;
        });
        document.getElementById('productsContainer').innerHTML = productsContainer;
    })
}
getProducts();