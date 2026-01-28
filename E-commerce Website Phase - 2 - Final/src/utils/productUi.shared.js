function attachAdminActions(productCard, product, handlers)
{
    const editProductButton = productCard.querySelector("#editButton");
    const deleteProductButton = productCard.querySelector("#deleteButton");
    
    editProductButton?.addEventListener("click", () => {
        handlers.onEdit(product);
    })

    deleteProductButton?.addEventListener("click", () => {
        handlers.onDelete(product.id);
    })
}  

async function attachUserActions(productCard, product, handlers, cartService)
{
    const addToCartButton = productCard.querySelector("#addToCartButton");
    const stock = await cartService.getAvailableStock(product.id);
    
    addToCartButton?.addEventListener("click", () => {
        if(stock <= 0)
        {
            alert("Product is out of stock.");
            return;
        }
        
        handlers.onAddToCart(product);
    });
}

export async function createProductCard(product, isAdmin, handlers = {}, cartService)
{
    const productCard = document.createElement("div");
    productCard.className = "productCard";  

    const stockToShow = isAdmin ? 
                        product.stock : await cartService.getAvailableStock(product.id);

    if(isAdmin)
    {
        productCard.innerHTML = `
            <img src="../src/images/productImages/${product.image}">
            <h4>${product.name}</h4>
            <p>Category: ${product.category}</p>
            <p>Price: ₹${product.price}</p>
            <p>Stock: ${stockToShow}</p>

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
            <img src="../src/images/productImages/${product.image}" alt="Product image">
            <h4>${product.name}</h4>
            <p>Category: ${product.category}</p>
            <p>Price: ₹${product.price}</p>
            <p>Stock: ${stockToShow}</p>
            <button id="addToCartButton">${stockToShow <= 0 ? "Out of Stock": "Add to Cart"}</button>
        `;

        await attachUserActions(productCard, product, handlers, cartService);
    }

    return productCard;
}

export function renderCategories(productService, products)
{
    const categoryFilterElement = document.getElementById("categoryFilter");

    if(!categoryFilterElement)
    {
        return;
    }

    categoryFilterElement.innerHTML = "";

    const categories = productService.getProductCategories(products);

    for(let category of categories)
    {
        const categoryOption = document.createElement("option");
        categoryOption.value = category.toLowerCase();
        categoryOption.textContent = category;

        categoryFilterElement.appendChild(categoryOption);
    }
}
