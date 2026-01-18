function getCartQuantity(productId)
{
    const storedCart = localStorage.getItem("shopKro_cart");
    const cart = storedCart ? JSON.parse(storedCart) : [];
    const cartProduct = cart.find((cartProduct) => (productId == cartProduct.id));

    if(cartProduct && cartProduct.quantity > 0)
    {
        return cartProduct.quantity;
    }

    return 0;
}

function renderCategories()
{
    const categoryFilterElement = document.getElementById("categoryFilter");
    categoryFilterElement.innerHTML = "";
    const categories = getProductCategories(allProducts);

    for(let category of categories)
    {
        const categoryOption = document.createElement("option");
        categoryOption.value = category;
        categoryOption.textContent = category;
        categoryFilterElement.appendChild(categoryOption);
    }
}

function renderProducts(productList)
{
    const productsListElement = document.getElementById("productList");
    productsListElement.innerHTML = "";
    
    if(productList.length == 0)
    {
        productsListElement.innerHTML = "<p>No product found.</p>";
        return;
    }

    for(let product of productList)
    {
        const productCard = document.createElement("div");
        productCard.className = "productCard";  

        const cartQuantity = getCartQuantity(product.id);
        const availableStock = product.stock - cartQuantity;

        productCard.innerHTML = `
            <img src="${product.image}" alt="Product image">
            <h4>${product.name}</h4>
            <p>Category: ${product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: ${availableStock}</p>
            <button> ${availableStock <= 0 ? "Out of Stock": "Add to Cart"}</button>
        `;

        const addToCartButton = productCard.querySelector("button");

        addToCartButton.addEventListener("click", () => {
            if(availableStock <= 0)
            {
                alert("Product is out of stock.");
                return;
            }

            addToCart(product);
            renderProducts(productList);
        });

        productsListElement.appendChild(productCard);
    }
}
