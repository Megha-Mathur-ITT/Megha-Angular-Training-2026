import { updateCartProductsCount } from "../../services/CartService/updateCartProductsCountUI.js";
import AuthenticationError from "../../errors/AuthenticationError.js";
import EmptyCartError from "../../errors/EmptyCartError.js";

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

async function createCartProductCard(product)
{
    const cartProduct = document.createElement("div");
        
    cartProduct.innerHTML = `
        <div class="cartProduct">
            <img src="../src/images/productImages/${product.image}" alt="${product.name}" class="cartProductImage">

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

    cartProduct.querySelector("#incrementProductQuantity").addEventListener("click", async () => {
        try
        {
            await cartService.increaseQuantity(product.id);
            updateCartProductsCount();
            await renderCart();
        }
        catch(error)
        {
            alert(error.message);
        }
    });

    cartProduct.querySelector("#decrementProductQuantity").addEventListener("click", async () => {
        try
        {
            cartService.decreaseQuantity(product.id);
            updateCartProductsCount();
            await renderCart();
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
            renderCart();
        }
        catch(error)
        {
            alert(error.message);
        }
    });

    return cartProduct;
}

export async function renderCart()
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
        const cartProduct = await createCartProductCard(product);
        cartContainerElement.appendChild(cartProduct);
    }

    updateTotal();
    updateCartProductsCount();
}

export function initializeCheckout()
{
    const checkoutButton = document.getElementById("checkoutButton");
    const spinner = document.getElementById("checkoutSpinner");
    const wrapper = document.getElementById("checkoutWrapper");

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

            if(cart.length === 0)
            {
                throw new EmptyCartError("Your cart is empty.");
            }

            spinner?.classList.remove("hidden");
            wrapper.classList.add("loading");
            checkoutButton.disabled = true;

            setTimeout(() => {
                alert("Checkout successfully.");

                window.cartService.clearCart();
                renderCart();
                updateCartProductsCount();

                spinner?.classList.add("hidden");
                wrapper.classList.remove("loading");
                checkoutButton.disabled = false;
            }, 1500);
        }
        catch(error)
        {
            spinner?.classList.add("hidden");
            checkoutButton.disabled = false;

            alert(error.message);
        }
    });
}
