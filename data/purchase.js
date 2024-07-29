// localStorage.removeItem('purchase');
// localStorage.removeItem('totalPrice');

const purchase = JSON.parse(localStorage.getItem('purchase')) || [];
const totalPrice = JSON.parse(localStorage.getItem('totalPrice')) || {
    price: 0
};



