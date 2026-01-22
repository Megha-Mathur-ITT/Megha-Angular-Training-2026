const allProductsData = products;
const searchInputElement = document.getElementById("searchProduct");
const categoryFilterElement = document.getElementById("categoryFilter");

searchInputElement.addEventListener("input", (event) => {
    updateVisibleProducts();
});

categoryFilterElement.addEventListener("change", (event) => {
    updateVisibleProducts();
});

function createProductCard(productList, product)
{
    const productCard = document.createElement("div");
    productCard.className = "productCard";  

    const productCartQuantity = getCartQuantity(product.id);
    const productAvailableStock = product.stock - productCartQuantity;

    productCard.innerHTML = `
        <img src="${product.image}" alt="Product image">
        <h4>${product.name}</h4>
        <p>Category: ${product.category}</p>
        <p>Price: ${product.price}</p>
        <p>Stock: ${productAvailableStock}</p>
        <button> ${productAvailableStock <= 0 ? "Out of Stock": "Add to Cart"}</button>
    `;

    const addToCartButton = productCard.querySelector("button");

    addToCartButton.addEventListener("click", () => {
        if(productAvailableStock <= 0)
        {
            alert("Product is out of stock.");
            return;
        }

        addToCart(product);
        renderProducts(productList);
    });

    return productCard;
}

function renderProducts(productList)
{
    const productsListContainer = document.getElementById("productList");
    productsListContainer.innerHTML = "";
    
    if(productList.length == 0)
    {
        productsListContainer.innerHTML = "<p>No product found.</p>";
        return;
    }

    for(let product of productList)
    {
        const productCard = createProductCard(productList, product);
        productsListContainer.appendChild(productCard);
    }

    updateCartProductsCount();
}

function updateVisibleProducts()
{
    let currentVisibleProducts = [...allProductsData];
    const searchedProduct = searchInputElement.value;
    const selectedCategory = categoryFilterElement.value;

    let filteredProducts = searchProductByName(allProductsData, searchedProduct);
    filteredProducts = filterProductsByCategory(filteredProducts, selectedCategory);
    currentVisibleProducts = [...filteredProducts];

    renderProducts(currentVisibleProducts); 
}

renderProducts(allProductsData);
