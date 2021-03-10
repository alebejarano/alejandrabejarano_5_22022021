// displays the resume of the order
function orderResume() {
let orderIdContainer = document.getElementById('command-id');
let finalPriceContainer = document.getElementById('final-price');
let backToHomeButton = document.getElementById('back-to-home');
const urlParams = new URLSearchParams(window.location.search);
let orderId = urlParams.get('orderId');
let finalPrice = localStorage.getItem('totalCost');
orderIdContainer.innerText = orderId;
finalPriceContainer.innerHTML = `${finalPrice}€`;
window.localStorage.removeItem('productsInCart');
window.localStorage.removeItem('totalProducts');
backToHomeButton.addEventListener('click', () => {
    window.localStorage.clear();
})
displayCartCounter();
}
orderResume();



