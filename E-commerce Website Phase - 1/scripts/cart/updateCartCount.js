function updateCartProductsCount() {
    const cartProductCount = document.getElementById("cartProductsCount");

    if (cartProductCount == null) 
    {
        return;
    }

    const totalProductsInCart = cart.reduce((totalProducts, product) => 
        totalProducts + product.quantity, 0);
    cartProductCount.textContent = totalProductsInCart;
}
