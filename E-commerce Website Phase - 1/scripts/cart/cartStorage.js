let cart = JSON.parse(localStorage.getItem("shopKro_cart")) || [];
const CART_KEY = "shopKro_cart";

function loadCart()
{
    const storedCart = localStorage.getItem(CART_KEY);
    cart = storedCart ? JSON.parse(storedCart) : [];
}

function saveCart()
{
    localStorage.setItem(CART_KEY, JSON.stringify(cart)); 
}

function getCart()
{
    return cart;
}

loadCart();
updateCartProductsCount();