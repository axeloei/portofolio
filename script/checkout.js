// Generate checkout items

let html = '';

cart.forEach((product) => {
  html += `
  <div class="delivery-items" id="${product.id}">
  <div class="delivery-date">Delivery date: <span class="js-delivery-date-${product.id}">Friday, July 28</span></div>
  <div class="item-information">
    <div class="image-container"><img src="${product.image}" alt="sneakers" class="product-image"></div>
    <div class="item-details">
      <div class="item-name">${product.name}</div>
      <div class="item-price">$${(product.price/100).toFixed(2)}</div>
      <div class="product-variation">Shoe size (US): 5</div>
      <div class="item-quantity">Quantity: <span class="quantity js-quantity-selector-${product.id}">${product.quantity}</span><input type="number" value="1" class="js-new-input js-is-inputing js-new-input-${product.id}"> <button class="js-update-button js-update-button-${product.id}" data-product-id="${product.id}">Update</button><button class="js-save-button js-save-button-${product.id} js-show-save-button" data-product-id="${product.id}">Save</button> <button class="js-delete-button" data-product-id="${product.id}">Delete</button></div>
    </div>
    <div class="delivery-details">
      <div class="delivery-option-text">Choose a delivery option:</div>
      <div class="delivery-options">
        <div class="options">
          <input type="radio" class="date-input " data-input-field="${product.id}" id="date-input-1-${product.id}" name="delivery-pick-${product.id}">
          <div class="option-date"><span class= "option-1">Friday, July 28</span><br><span class="option-price">FREE Shipping</span></div>
        </div>
        <div class="options">
          <input type="radio" class="date-input" data-input-field="${product.id}" id="date-input-2-${product.id}" name="delivery-pick-${product.id}">
          <div class="option-date"><span class= "option-2">Monday, July 24</span><br><span class="option-price">$<span class="option-2-price">4.99</span> - Shipping</span></div>
        </div>
        <div class="options">
          <input type="radio" class="date-input" data-input-field="${product.id}" id="date-input-3-${product.id}" name="delivery-pick-${product.id}">
          <div class="option-date"><span class="option-3">Thursday, July 20</span><br><span class="option-price">$<span class="option-3-price">9.99</span> - Shipping</span></div>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
});

document.querySelector('.delivery-container').innerHTML = html;

// Update, save, and delete button

document.querySelectorAll('.js-delete-button').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    const removeElement = document.getElementById(`${productId}`);
    removeElement.remove();

    for(let i = 0; i < cart.length; i++){
      if(cart[i].id === productId){
        cartQuantity.quantity -= cart[i].quantity;
        localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));

        cart.splice(i, 1);
        localStorage.setItem('cart', JSON.stringify(cart));

        shippingPrice.splice(i+1, 1);
        localStorage.setItem('shippingPrice', JSON.stringify(shippingPrice));
        countShippingPrice();
        document.querySelector('.total-shipping-price').innerHTML = countShippingPrice();

        toggleRadio.splice(i, 1);
        localStorage.setItem('toggleRadio', JSON.stringify(toggleRadio));

        break;
      }
    }

    // Refresh DOM
    document.querySelector('.total-item-in-cart').innerHTML = cartQuantity.quantity;
    document.querySelector('.js-order-count').innerHTML = cartQuantity.quantity;
    countPrice();
    document.querySelector('.js-item-price').innerHTML = countPrice();
    countBeforeTax();
    document.querySelector('.js-total-before-tax').innerHTML = (countBeforeTax() / 100).toFixed(2);
    countTax();
    document.querySelector('.js-tax-price').innerHTML = (countTax() / 100).toFixed(2);
    countTotalPrice();
    document.querySelector('.js-total-order-price').innerHTML = (totalPriceCents() / 100).toFixed(2);
  })
});

document.querySelectorAll('.js-update-button').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    document.querySelector(`.js-quantity-selector-${productId}`).classList.add('js-display-toggle');
    document.querySelector(`.js-update-button-${productId}`).classList.add('js-display-toggle');
    document.querySelector(`.js-new-input-${productId}`).classList.remove('js-new-input');
    document.querySelector(`.js-save-button-${productId}`).classList.remove('js-save-button');
  })
});

document.querySelectorAll('.js-show-save-button').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    const inputValue = document.querySelector(`.js-new-input-${productId}`).value;
    
    let temp, diff;

    cart.forEach((product) => {
      if(product.id === productId){
        temp = product.quantity;
        product.quantity = Number(inputValue);
        diff = temp - product.quantity;

        document.querySelector(`.js-quantity-selector-${productId}`).innerHTML = product.quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        // console.log(diff);
      }
    });

    cartQuantity.quantity -= diff;
    localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));

    // Refresh DOM
    document.querySelector(`.js-new-input-${productId}`).classList.add('js-new-input');
    document.querySelector(`.js-save-button-${productId}`).classList.add('js-save-button');
    document.querySelector(`.js-quantity-selector-${productId}`).classList.remove('js-display-toggle');
    document.querySelector(`.js-update-button-${productId}`).classList.remove('js-display-toggle');
    document.querySelector('.total-item-in-cart').innerHTML = cartQuantity.quantity;
    document.querySelector('.js-order-count').innerHTML = cartQuantity.quantity;
    countPrice();
    document.querySelector('.js-item-price').innerHTML = countPrice();
    countShippingPrice();
    document.querySelector('.total-shipping-price').innerHTML = countShippingPrice();
    countBeforeTax();
    document.querySelector('.js-total-before-tax').innerHTML = (countBeforeTax() / 100).toFixed(2);
    countTax();
    document.querySelector('.js-tax-price').innerHTML = (countTax() / 100).toFixed(2);
    countTotalPrice();
  })
});

document.querySelector('.total-item-in-cart').innerHTML = cartQuantity.quantity;

// Shipping function

document.querySelectorAll('.date-input').forEach((input) => {
  input.addEventListener('click', () => {
    const inputField = input.dataset.inputField;
    const firstInput = document.getElementById(`date-input-1-${inputField}`);
    const secondInput = document.getElementById(`date-input-2-${inputField}`);
    const thirdInput = document.getElementById(`date-input-3-${inputField}`);

    let html = '', priceHTML = '';
    let toggle;

    if(firstInput.checked){
      html = document.querySelector('.option-1').innerHTML;
      priceHTML = 0;
      toggle = 1;
    }else if(secondInput.checked){
      html = document.querySelector('.option-2').innerHTML;
      priceHTML = document.querySelector('.option-2-price').innerHTML;
      toggle = 2;
    }else if(thirdInput.checked){
      html = document.querySelector('.option-3').innerHTML;
      priceHTML = document.querySelector('.option-3-price').innerHTML;
      toggle = 3;
    }

    // console.log(html);
    document.querySelector(`.js-delivery-date-${inputField}`).innerHTML = html;
    priceHTML = Number(priceHTML) * 100;
    
    let sameItem;

    shippingPrice.forEach((product) => {
      if(product.id === inputField){
        product.price = priceHTML;
        sameItem = true;
      }
    })

    if(!sameItem){
      shippingPrice.push({
        id: inputField,
        price: priceHTML
      });
      sameItem = false;
    }

    // console.log(shippingPrice);
    localStorage.setItem('shippingPrice', JSON.stringify(shippingPrice));
    countShippingPrice();
    document.querySelector('.total-shipping-price').innerHTML = countShippingPrice();
    countBeforeTax();
    document.querySelector('.js-total-before-tax').innerHTML = (countBeforeTax() / 100).toFixed(2);
    countTax();
    document.querySelector('.js-tax-price').innerHTML = (countTax() / 100).toFixed(2);
    countTotalPrice();

    let toggleToggler;

    toggleRadio.forEach((item) => {
      if(item.id === inputField){
        item.element = toggle;
        toggleToggler = true;
      }
    })

    if(!toggleToggler){
      toggleRadio.push({
        id: inputField,
        element: toggle
      });
    }

    localStorage.setItem('toggleRadio', JSON.stringify(toggleRadio));
    console.log(toggleRadio);
  })
});


if(cart){
  toggleRadio.forEach((item) => {
    // console.log(toggleRadio);
    const itemId = item.id;
    const optionNumber = item.element;
  
    const toggleOn = document.getElementById(`date-input-${optionNumber}-${itemId}`);
    // toggleOn.checked = true;
  });
}

// Order Summary

document.querySelector('.js-order-count').innerHTML = cartQuantity.quantity;

function countPrice(){
  let price = 0;

  cart.forEach((product) => {
    price += (product.quantity * product.price);
  })
  
  // console.log(price/100);

  return price/100;
}

countPrice();
document.querySelector('.js-item-price').innerHTML = countPrice();

function countShippingPrice(){
  let temp, tempPrice = 0;

  shippingPrice.forEach((product) => {
    temp = Number(product.price);
    tempPrice += temp;
  });

  return (tempPrice / 100).toFixed(2);
}

document.querySelector('.total-shipping-price').innerHTML = countShippingPrice();

function countBeforeTax(){
  const beforeTax = (countPrice() * 100) + (countShippingPrice() * 100);

  return beforeTax;
}

function countTax(){
  const tax = countBeforeTax() * 0.1;

  return tax;
}

function countTotalPrice(){
  const beforeTax = document.querySelector('.js-total-before-tax').innerHTML = (countBeforeTax() / 100).toFixed(2);
  const tax = document.querySelector('.js-tax-price').innerHTML = (countTax() / 100).toFixed(2);;
  
  const tempA = Number(beforeTax) * 100;
  const tempB = Number(tax) * 100;
  const total = tempA + tempB;

  document.querySelector('.js-total-order-price').innerHTML = (total / 100).toFixed(2);
}


countBeforeTax();
document.querySelector('.js-total-before-tax').innerHTML = (countBeforeTax() / 100).toFixed(2);
countTax();
document.querySelector('.js-tax-price').innerHTML = (countTax() / 100).toFixed(2);
countTotalPrice();

document.querySelector('.js-button-purchase-order').addEventListener('click', () => {
  for(let i = 0; i < cart.length; i++){
    purchase.push(cart[i]);
  }

  const tempCart = [];
  localStorage.setItem('cart', JSON.stringify(tempCart));

  cartQuantity.quantity = 0;
  localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity)); 


  document.querySelector('.delivery-container').innerHTML = '';
  
  localStorage.removeItem('shippingPrice');

  // console.log(purchase);
  localStorage.setItem('purchase', JSON.stringify(purchase));

  const tempPrice = document.querySelector('.js-total-order-price').innerHTML;
  const tempPriceCents = Number(tempPrice) * 100;
  totalPrice.price += tempPriceCents;

  // console.log(tempPriceCents);

  localStorage.setItem('totalPrice', JSON.stringify(totalPrice));

  //Refresh DOM


  document.querySelector('.js-item-price').innerHTML = '0';
  document.querySelector('.total-shipping-price').innerHTML = '0.00';
  document.querySelector('.js-total-before-tax').innerHTML = '0.00';
  document.querySelector('.js-tax-price').innerHTML = '0.00';
  document.querySelector('.js-total-order-price').innerHTML = '0.00';
  document.querySelector('.total-item-in-cart').innerHTML - '0';
})

// console.log(purchase);



