import { createProductCard, renderCategories } from "../../utils/productUi.shared.js";
import { updateCartProductsCount } from "../../services/CartService/updateCartProductsCountUI.js";

let userProductServiceRef = null;

export async function initializeUserProductPage (userProductService) { 
    const searchInputElement = document.getElementById("searchProduct");
    const categoryFilterElement = document.getElementById("categoryFilter");
    const productList = document.getElementById("productList");

    if (!searchInputElement || !categoryFilterElement || !productList) {
        return; 
    }
    
    userProductServiceRef = userProductService;
    let products = await userProductServiceRef.getAllProducts();

    searchInputElement.addEventListener("input", updateVisibleProducts);
    categoryFilterElement.addEventListener("change", updateVisibleProducts);
    
    renderCategories(userProductServiceRef, products);
    updateVisibleProducts();
}

async function renderUserProductSection(productList)
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
        const productCard = await createProductCard(product, false, {
            onAddToCart(product) {
                try
                {
                    window.cartService.addToCart(product);
                    updateVisibleProducts();
                }
                catch(error) 
                {
                    alert(error.message);
                };
            },
        },
        window.cartService
    );
        
        productsListContainer.appendChild(productCard);
    }

    updateCartProductsCount();
}

async function updateVisibleProducts() {
    const searchInputElement = document.getElementById("searchProduct");
    const categoryFilterElement = document.getElementById("categoryFilter");

    if (!searchInputElement || !categoryFilterElement) {
        return; 
    }

    const searchedProduct = searchInputElement.value.toLowerCase();
    const selectedCategory = categoryFilterElement.value;

    let products = await userProductServiceRef.getAllProducts();
    products = userProductServiceRef.searchProductByName(products, searchedProduct);
    products = userProductServiceRef.filterProductsByCategory(products, selectedCategory);
    
    renderUserProductSection(products);
}
