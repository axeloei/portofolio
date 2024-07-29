// Generate HTML

let html = '';

products.forEach((product) => {
  html += `
  <div class="product-container">
  <div class="image-container"><img src="${product.image}" alt="" class="
  product-image"></div>
  <div class="product-name">${product.name}</div>
  <div class="rating-section">
    <img src="images/ratings/rating-${product.rating.stars*10}.png" alt="" class="stars-image">
    <div class="rating-count">${product.rating.count}</div>
  </div>
  <div class="product-price">$${(product.priceCents/100).toFixed(2)}</div>
  <div class="quantity-selector-section">
    <select class="quantity-selector js-quantity-selector-${product.id}">
      <option selected value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
  </div>
  <button class="add-button js-add-button" data-product-id="${product.id}" data-product-name="${product.name}" data-product-image="${product.image}" data-product-price="${product.priceCents}">Add to Cart</button>
</div>
  `;
})

document.querySelector('.product-grid').innerHTML = html;

// "Add to cart" function and show cart quantity on header 

document.querySelectorAll('.js-add-button').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    const quantity = document.querySelector(`.js-quantity-selector-${productId}`).value;
    const productName = button.dataset.productName;
    const productImage = button.dataset.productImage;
    const productPrice = button.dataset.productPrice;

    // console.log(productId);
    // console.log(productName);

    let sameItem;

    cart.forEach((product) => {
      if(product.id === productId){
        product.quantity += Number(quantity);
        sameItem = true;
      } 
    });

    if(!sameItem){
      cart.push({
        id: productId,
        quantity: Number(quantity),
        name: productName,
        image: productImage,
        price: productPrice
      });
      sameItem = false;
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    let tempQuantity = 0;

    cart.forEach((product) => {
       tempQuantity += product.quantity;
    })

    cartQuantity.quantity = tempQuantity;
    localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
    
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity.quantity;

    // console.log(cartQuantity);
  })
})

// Generate cart quantity

document.querySelector('.js-cart-quantity').innerHTML = cartQuantity.quantity;