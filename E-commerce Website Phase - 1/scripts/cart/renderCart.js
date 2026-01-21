function updateTotal()
{
    const cartTotalElement = document.getElementById("cartTotal");
 
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
            <img src="${product.image}" alt="${product.name}" class="cartProductImage">

            <div class = "cartProductDetails">
                <h4>${product.name}</h4>
                <p>Price: ₹${product.price}</p>
                <p>Subtotal: ₹${product.price * product.quantity}</p>

                <div id = "quantityControl">
                    <button onclick="decreaseQuantity(${product.id})">-</button>
                    <span>${product.quantity}</span>
                    <button onclick="increaseQuantity(${product.id})">+</button>
                </div>

                <button onclick="removeProduct(${product.id})">Remove</button>
            </div> 

        </div>
    `;

    return cartProduct;
}

function renderCart()
{
    const cartContainerElement = document.getElementById("cartContainer");
    const cartTotalElement = document.getElementById("cartTotal");

    if(cartContainerElement == null || cartTotalElement == null)
    {
        return;
    }

    cartContainerElement.innerHTML = "";

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

renderCart();
