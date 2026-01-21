function searchProductByName(productList, searchedProduct)
{
    searchedProduct = searchedProduct.trim().toLowerCase();

    if(searchedProduct == "")
    {
        return productList;
    }

    const productsFiltered = productList.filter((product) => (
        product.name.toLowerCase().includes(searchedProduct)
    ));

    return productsFiltered;
}

function filterProductsByCategory(productList, selectedCategory)
{
    if(selectedCategory == "all")
    {
        return productList;
    }
    
    const productsFiltered = productList.filter((product) => (
        product.category.toLowerCase() == selectedCategory.toLowerCase()
    ));

    return productsFiltered;
}

function getCartQuantity(productId)
{
    const storedCart = localStorage.getItem("shopKro_cart");
    const cart = storedCart ? JSON.parse(storedCart) : [];
    const cartProduct = cart.find((cartProduct) => (cartProduct && productId == cartProduct.id));

    if(cartProduct && cartProduct.quantity > 0)
    {
        return cartProduct.quantity;
    }

    return 0;
}

