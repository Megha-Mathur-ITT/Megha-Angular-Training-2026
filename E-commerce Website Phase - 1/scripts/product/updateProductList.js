const allProducts = products;
const searchProductElement = document.getElementById("searchProduct");
const categoryFilterElement = document.getElementById("categoryFilter");

function updateProductsList()
{
    let currentVisibleProducts = [...allProducts];
    const searchedProduct = searchProductElement.value;
    const selectedCategory = categoryFilterElement.value;

    let productsFound = searchProductByName(allProducts, searchedProduct);
    productsFound = filterProductsByCategory(productsFound, selectedCategory);
    currentVisibleProducts = [...productsFound];

    renderProducts(currentVisibleProducts); 
}

renderCategories();
renderProducts(allProducts);

searchProductElement.addEventListener("input", (event) => {
    updateProductsList();
});

categoryFilterElement.addEventListener("change", (event) => {
    updateProductsList();
});
