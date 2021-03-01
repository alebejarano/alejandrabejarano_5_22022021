// to display the selected product in the product preview page
function getSingleProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    ApiHelpers.get(`http://localhost:3000/api/teddies/${productId}`)
    .then((teddie) => {
        let colorOptions = '';
        teddie.colors.forEach(color => {
            colorOptions += `<option class="btn" value="color">${color}</option>`
        })
        let preview = `
        <div class="card mb-3">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img  class="card-img" src="${teddie.imageUrl}" alt="ours en peluche">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title teddie-name">${teddie.name}</h5>
                        <p class="card-text">${teddie.price}&euro;</p>
                        <hr>
                        <p class="card-text">${teddie.description}</p>
                        <hr>
                        <label for="color-select">Choix des Coleurs:</label>
                        <select name="colors" id="color-select">
                            ${colorOptions}
                        </select>
                        <button type="button" class="btn  btn-light cart-text py-1 px-3 product-preview" data-product-id="${teddie._id}">Ajouter au Panier</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        document.getElementById('preview').innerHTML = preview; 
        // to add to the cart the selected product
        let addToCarts = document.querySelectorAll('.product-preview');
        addToCarts.forEach(productButton => {
            productButton.addEventListener('click', () => {
                let productId = productButton.getAttribute("data-product-id")
                addProduct(productId);
            })
        });
    });
}
getSingleProduct();
