const allProducts = products;
const searchProductELement = document.getElementById("searchProduct");
const categoryFilterElement = document.getElementById("categoryFilter");

function updateProductsList()
{
    let currentVisibleProducts = [...allProducts];
    const searchedProduct = searchProductELement.value;
    const selectedCategory = categoryFilterElement.value;

    let productsFound = searchProductByName(allProducts, searchedProduct);
    productsFound = filterProductsByCategory(productsFound, selectedCategory);
    currentVisibleProducts = productsFound;

    renderProducts(currentVisibleProducts); 
}

renderCategories();
renderProducts(allProducts);

searchProductELement.addEventListener("input", (event) => {
    const searchValue = event.target.value.trim();
    updateProductsList(searchValue);
});

categoryFilterElement.addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    updateProductsList(selectedCategory);
});
