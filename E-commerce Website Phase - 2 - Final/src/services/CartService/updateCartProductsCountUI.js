export function updateCartProductsCount() {
    const cartProductCount = document.getElementById("cartProductsCount");

    if (cartProductCount == null) 
    {
        return;
    }

    cartProductCount.textContent = window.cartService.getTotalQuantity();
}
