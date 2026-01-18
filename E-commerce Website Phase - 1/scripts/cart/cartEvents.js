const checkoutButtonElement = document.getElementById("checkoutButton");

if(checkoutButtonElement)
{
    checkoutButtonElement.addEventListener("click", () => {
        if(cart.length == 0)
        {
            alert("Your cart is empty.");
            return;
        }
    
        alert("Checkout successful.");
        cart = [];

        saveCart();
        renderCart();
        updateCartProductsCount();
    })
}
