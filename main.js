let products = [];
function getProducts() {
    fetch('http://localhost:3000/api/teddies')
    .then((res) => res.json())
    .then((data) => {
        let productsContainer = '<h2 class="teddies-title text-center my-5">Notre Teddies</h2>';
        data.forEach(function(teddie){
            productsContainer +=
            `<div class="row">
                <div class="col-lg-3">
                    <div class="card">
                    <img class="card-img-top" src="${teddie.imageUrl}">
                        <div class="card-body">
                            <h3 class="card-title">${teddie.name}</h3>
                            <p class="id-productsList">${teddie._id}</p>
                            <p class="card-text">${teddie.price}&euro;</p>
                        </div> 
                    </div>       
                </div>
            </div>
            `;
        });
        document.getElementById('productsContainer').innerHTML = productsContainer;
    })
}
getProducts();