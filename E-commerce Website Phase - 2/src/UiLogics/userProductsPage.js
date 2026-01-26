import { createProductCard, renderCategories } from "./productUi.shared.js";
import { updateCartProductsCount } from "./cartCountUI.js";

let currentVisibleProducts = [];
let userProductServiceRef;
let allProductsRef;

export function initializeUserProductPage (userProductService, allProductsData) { 
    const searchInputElement = document.getElementById("searchProduct");
    const categoryFilterElement = document.getElementById("categoryFilter");
    const productList = document.getElementById("productList");
    userProductServiceRef = userProductService;
    allProductsRef = allProductsData;

    if (!searchInputElement || !categoryFilterElement || !productList) {
        return; 
    }
    
    currentVisibleProducts = [...(allProductsRef || [])];

    searchInputElement.addEventListener("input", updateVisibleProducts);
    categoryFilterElement.addEventListener("change", updateVisibleProducts);
    
    renderCategories(userProductServiceRef, allProductsRef);
    renderProducts(currentVisibleProducts);
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
        const productCard = createProductCard(productList, product, false, {
            onAddToCart(product) {
                try
                {
                    window.cartService.addToCart(product);
                    renderProducts(currentVisibleProducts);
                }
                catch(error) 
                {
                    alert(error.message);
                };
            }
        });
        
        productsListContainer.appendChild(productCard);
    }

    updateCartProductsCount();
}

function updateVisibleProducts()
{
    const searchInputElement = document.getElementById("searchProduct");
    const categoryFilterElement = document.getElementById("categoryFilter");
    
    const searchedProduct = searchInputElement.value;
    const selectedCategory = categoryFilterElement.value;

    let filteredProducts = userProductServiceRef.searchProductByName(allProductsRef, searchedProduct);
    filteredProducts = userProductServiceRef.filterProductsByCategory(filteredProducts, selectedCategory);
    currentVisibleProducts = [...filteredProducts];

    renderProducts(currentVisibleProducts); 
}

