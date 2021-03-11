// displays the resume of the order
function orderResume() {
let orderIdContainer = document.getElementById('command-id');
let finalPriceContainer = document.getElementById('final-price');
const urlParams = new URLSearchParams(window.location.search);
let orderId = urlParams.get('orderId');
let finalPrice = localStorage.getItem('totalCost');
// order id and the final price to show 
orderIdContainer.innerText = orderId;
finalPriceContainer.innerText = `${finalPrice}€`;
//to clear everything in localstorage and start from scratch
window.localStorage.clear();
// to actualize the (put to none) cart counter bubble in the cart icon
displayCartCounter();
}
orderResume();



