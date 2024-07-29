// localStorage.removeItem('shippingPrice');
// localStorage.removeItem('toggleRadio');
const shippingPrice = JSON.parse(localStorage.getItem('shippingPrice')) || [{
  id: 0,
  price: 0
}];
const toggleRadio = JSON.parse(localStorage.getItem('toggleRadio')) || [];
