import { updateCartProductsCount } from "./cartCountUI.js";
import AuthenticationError from "../errors/AuthenticationError.js";

function updateTotal()
{
    const cartTotalElement = document.getElementById("cartTotal");
    const cart = window.cartService.getCart();
    
    const total = cart.reduce((totalPrice, product) => {
        totalPrice += product.price * product.quantity;

        return totalPrice;
    }, 0);

    cartTotalElement.textContent = total;
}

function createCartProductCard(product)
{
    const cartProduct = document.createElement("div");
        
    cartProduct.innerHTML = `
        <div class="cartProduct">
            <img src="./src/images/productImages/${product.image}" alt="${product.name}" class="cartProductImage">

            <div class = "cartProductDetails">
                <h4>${product.name}</h4>
                <p>Price: ₹${product.price}</p>
                <p>Subtotal: ₹${product.price * product.quantity}</p>

                <div id = "quantityControl">
                    <button id="decrementProductQuantity">-</button>
                    <span>${product.quantity}</span>
                    <button id="incrementProductQuantity">+</button>
                </div>

                <button id="removeProduct">Remove</button>
            </div> 

        </div>
    `;

    cartProduct.querySelector("#incrementProductQuantity").addEventListener("click", () => {
        try
        {
            cartService.increaseQuantity(product.id);
            updateCartProductsCount();
            renderCart(cartService);
        }
        catch(error)
        {
            alert(error.message);
        }
    });

    cartProduct.querySelector("#decrementProductQuantity").addEventListener("click", () => {
        try
        {
            cartService.decreaseQuantity(product.id);
            updateCartProductsCount();
            renderCart(cartService);
        }
        catch(error)
        {
            alert(error.message);
        }
    });

    cartProduct.querySelector("#removeProduct").addEventListener("click", () => {
        try
        {
            cartService.removeProduct(product.id);
            updateCartProductsCount();
            renderCart(cartService);
        }
        catch(error)
        {
            alert(error.message);
        }
    });

    return cartProduct;
}

export function renderCart()
{
    const cartContainerElement = document.getElementById("cartContainer");
    const cartTotalElement = document.getElementById("cartTotal");

    if(cartContainerElement == null || cartTotalElement == null)
    {
        return;
    }

    cartContainerElement.innerHTML = "";
    const cart = window.cartService.getCart();

    if(cart.length == 0)
    {
        cartContainerElement.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalElement.innerHTML = "0";
        
        return;
    }

    for(let product of cart)
    {
        const cartProduct = createCartProductCard(product);
        cartContainerElement.appendChild(cartProduct);
    }

    updateTotal();
    updateCartProductsCount();
}

export function initializeCheckout()
{
    const checkoutButton = document.getElementById("checkoutButton");

    if(!checkoutButton)
    {
        return;
    }

    checkoutButton.addEventListener("click", () => {
        try
        {
            if(!window.cartService.authenticationService.isLoggedIn())
            {
                throw new AuthenticationError("Please login to proceed to checkout.");
            }

            const cart = window.cartService.getCart();

            if(cart.length == 0)
            {
                alert("Your cart is empty.");
                return;
            }

            alert("Checkout successfully.");
            window.cartService.clearCart();
            renderCart();
            updateCartProductsCount();
        }
        catch(error)
        {
            alert(error.message);
        }
    });
}
