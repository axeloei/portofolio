// Generate checkout items

let html = '';

purchase.forEach((product) => {
  html += `
  <div class="image-container">
    <img src="${product.image}" alt="" class="product-image">
  </div>
  <div class="product-details">
    <div class="product-name">${product.name}</div>
    <div class="arrival-date">Arriving on: NANTI DIGANTI</div>
    <div class="order-quantity">Quantity: ${product.quantity}</div>
    <div><button class="buy-again">Buy it again</button></div>
  </div>
  <div class="right-container">
    <button class="track-button">Track package</button>
  </div>
  `;
});

document.querySelector('.product-grid').innerHTML = html;

document.querySelector('.total-price').innerHTML = (totalPrice.price / 100).toFixed(2);

document.querySelector('.cart-quantity').innerHTML = cartQuantity.quantity;