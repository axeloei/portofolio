// localStorage.removeItem('cart');
// localStorage.removeItem('cartQuantity');

const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartQuantity = JSON.parse(localStorage.getItem('cartQuantity')) || {
  quantity: 0
};

// console.log(cart);