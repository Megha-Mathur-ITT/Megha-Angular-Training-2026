const CART_KEY = "shopKro_cart";
let cart;

function initializeCart()
{
    const storedCart = localStorage.getItem(CART_KEY);
    cart = storedCart ? JSON.parse(storedCart) : [];
}

function saveCart()
{
    localStorage.setItem(CART_KEY, JSON.stringify(cart)); 
}

initializeCart();
