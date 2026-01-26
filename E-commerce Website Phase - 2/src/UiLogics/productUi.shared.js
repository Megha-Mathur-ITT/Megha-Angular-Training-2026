import { updateCartProductsCount } from "./cartCountUI.js";

let currentVisibleProducts = [];

function attachAdminActions(productCard, product, handlers)
{
    const editProductButton = productCard.querySelector("#editButton");
    const deleteProductButton = productCard.querySelector("#deleteButton");
    
    editProductButton.addEventListener("click", () => {
        handlers.onEdit(product);
    })

    deleteProductButton.addEventListener("click", () => {
        handlers.onDelete(product.id);
    })
}  

function attachUserActions(productCard, product, handlers)
{
    const addToCartButton = productCard.querySelector("#addToCartButton");
    const productAvailableStock = window.cartService.getAvailableStock(product.id);

    addToCartButton.addEventListener("click", () => {
        if(productAvailableStock <= 0)
        {
            alert("Product is out of stock.");
            return;
        }
        
        handlers.onAddToCart(product);
    });
}

export function createProductCard(productList, product, isAdmin, handlers = {})
{
    const productCard = document.createElement("div");
    productCard.className = "productCard";  

    const productAvailableStock = window.cartService.getAvailableStock(product.id);

    if(isAdmin)
    {
        productCard.innerHTML = `
            <img src="./src/images/productImages/${product.image}">
            <h4>${product.name}</h4>
            <p>Category: ${product.category}</p>
            <p>Price: ₹${product.price}</p>
            <p>Stock: ${productAvailableStock}</p>

            <div id="adminActions">
                <button id="editButton">Edit</i>
                <button id="deleteButton">Delete</i>
            </div>
        `;

        attachAdminActions(productCard, product, handlers);
    }
    else
    {
        productCard.innerHTML = `
            <img src="./src/images/productImages/${product.image}" alt="Product image">
            <h4>${product.name}</h4>
            <p>Category: ${product.category}</p>
            <p>Price: ₹${product.price}</p>
            <p>Stock: ${productAvailableStock}</p>
            <button id="addToCartButton">${productAvailableStock <= 0 ? "Out of Stock": "Add to Cart"}</button>
        `;

        attachUserActions(productCard, product, handlers);
    }

    return productCard;
}

export function renderCategories(userProductService, allProductsData)
{
    const categoryFilterElement = document.getElementById("categoryFilter");
    categoryFilterElement.innerHTML = "";
    const categories = userProductService.getProductCategories(allProductsData);

    for(let category of categories)
    {
        const categoryOption = document.createElement("option");
        categoryOption.value = category.toLowerCase();
        categoryOption.textContent = category;
        categoryFilterElement.appendChild(categoryOption);
    }
}
