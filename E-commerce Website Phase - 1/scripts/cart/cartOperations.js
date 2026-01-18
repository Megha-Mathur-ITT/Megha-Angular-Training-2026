function getAvailableStock(productId)
{
    const product = products.find((product) => (productId == product.id));
    const cartProduct = cart.find((cartProduct) => (productId == cartProduct.id));

    const cartQuantity = cartProduct ? cartProduct.quantity : 0;
    const availableStock = product.stock - cartQuantity;

    return availableStock;
}

function addToCart(product)
{   
    if(product.stock <= 0)
    {
        alert("Product is out of stock.");
        return;
    }

    const existingProduct = cart.find((cartProduct) => (cartProduct.id == product.id));

    if(existingProduct)
    {
        cart = cart.map((cartProduct) => (
            cartProduct.id == product.id ? {...cartProduct, quantity: cartProduct.quantity + 1} : cartProduct
        ));
    }
    else
    {
        const cartProduct = {...product, quantity: 1};
        cart.push(cartProduct);
    }

    saveCart();
    renderCart();
    updateCartProductsCount();
}

function increaseQuantity(productId)
{
    const cartProduct = cart.find((cartProduct) => (cartProduct.id == productId));
    const availableStock = getAvailableStock(productId);

    if(availableStock <= 0)
    {
        alert("Product is out of stock.");
        return;
    }

    cartProduct.quantity++;
    saveCart();
    renderCart();
    updateCartProductsCount();   
}

function decreaseQuantity(productId)
{
    const cartProduct = cart.find((cartProduct) => (cartProduct.id == productId));
    const product = products.find((product) => (productId == product.id));
    
    cartProduct.quantity--;

    if(cartProduct.quantity <= 0)
    {
        cart = cart.filter((product) => (productId != product.id));
    }

    saveCart();
    renderCart();
    updateCartProductsCount();
}

function removeProduct(productId)
{
    cart = cart.filter((cartProduct) => (cartProduct.id != productId));

    saveCart();
    renderCart();
    updateCartProductsCount();
}
