// to show the  chosen product that appears in Teddies in a single page (preview the indivudual product before adding to the cart)
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
ApiHelpers.get(`http://localhost:3000/api/teddies/${productId}`)
  .then(teddie => {
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
                        <select class="form-control" name="colors" id="color-select">
                            ${colorOptions}
                        </select>
                        <button type="button" class="btn btn-secondary d-block cart-text py-1 px-3 mt-3 product-preview" id="add-to-cart-button">Ajouter au Panier</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    document.getElementById('preview').innerHTML = preview;
    document.getElementById('add-to-cart-button').addEventListener('click', () => {
      addProduct(teddie);
    });
  });
 
   // to create messages notifications
 function notify(message, type) {
  let notification = document.getElementById('notification');
  notification.innerText = message;
  notification.classList.add(type);
}
