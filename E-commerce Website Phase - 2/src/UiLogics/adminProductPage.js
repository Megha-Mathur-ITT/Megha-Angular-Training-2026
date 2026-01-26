import { createProductCard, renderCategories } from "./productUi.shared.js";
import AuthenticationService from "../services/AuthenticationService.js";

const authenticationService = new AuthenticationService();

let currentVisibleProducts = [];
let adminProductServiceRef;
let allProductsRef;

export function initAdminProductsPage(adminProductService, allProductsData) {
    if (!authenticationService.isLoggedIn() || !authenticationService.isAdmin()) {
        window.location.href = "products.html";
        return; 
    }

    const searchInputElement = document.getElementById("searchProduct");
    const categoryFilterElement = document.getElementById("categoryFilter");
    const productList = document.getElementById("productList");

    adminProductServiceRef = adminProductService;
    allProductsRef = allProductsData;

    if (!searchInputElement || !categoryFilterElement || !productList) {
        return; 
    }

    currentVisibleProducts = [...(allProductsRef || [])];

    searchInputElement.addEventListener("input", updateVisibleProducts);
    categoryFilterElement.addEventListener("change", updateVisibleProducts);

    renderCategories(adminProductServiceRef, allProductsRef);
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

    renderAddNewProductButton();

    for(let product of productList)
    {
        const productCard = createProductCard(productList, product, true, {
            onEdit: showEditProductForm,
            onDelete: deleteProduct,
        });

        productsListContainer.appendChild(productCard);
    }
}

function renderAddNewProductButton()
{
    const productsListContainer = document.getElementById("productList");

    if (document.getElementById("adminAddNewProductContainer"))
    {
        return;
    }
    
    const addNewProductContainer = document.createElement("div");
    addNewProductContainer.id = "adminAddNewProductContainer";
    addNewProductContainer.innerHTML = `<button id="addNewProductButton">Add new Product</button>`;
    addNewProductContainer.title = "Add new product";

    addNewProductContainer.addEventListener("click", showAddNewProductForm);
    productsListContainer.appendChild(addNewProductContainer)
}

function showEditProductForm(product)
{   
    if (!authenticationService.isLoggedIn() || !authenticationService.isAdmin()) {
        alert("Admin login required");
        return;
    }

    const editProductFormContainer = document.createElement("div");
    editProductFormContainer.id = "adminEditProductForm";

    editProductFormContainer.innerHTML = `
        <label for="editProductName">Product Name:
        <input value="${product.name}" id="editProductName">

        <label for="editProductPrice">Product Price:
        <input value="${product.price}" id="editProductPrice">

        <label for="editProductStock">Product Stock:
        <input value="${product.stock}" id="editProductStock">

        <button id="updateProductButton">Update</button>
        <button id="cancelUpdateProductButton">Cancel</button>
    `

    document.body.appendChild(editProductFormContainer);

    editProductFormContainer.querySelector("#updateProductButton").onclick = async () => {
        const productNameInput = editProductFormContainer.querySelector("#editProductName");
        const productPriceInput = editProductFormContainer.querySelector("#editProductPrice");
        const productStockInput = editProductFormContainer.querySelector("#editProductStock");

        try
        {
            await window.adminProductService.updateProduct(product.id, {
                name: productNameInput.value,
                price: productPriceInput.value,
                stock: productStockInput.value,
            });

            const updatedProducts = await window.adminProductService.getAllProducts();
            window.allProductsData = updatedProducts;
            currentVisibleProducts = [...updatedProducts];

            editProductFormContainer.remove();

            renderCategories(adminProductServiceRef, allProductsRef);
            renderProducts(currentVisibleProducts);
        }
        catch(error)
        {
            alert(error.message);
        }
    };

    editProductFormContainer.querySelector("#cancelUpdateProductButton").onclick = () => (
        editProductFormContainer.remove()
    );
} 

function showAddNewProductForm()
{
    if (!authenticationService.isLoggedIn() || !authenticationService.isAdmin()) {
        alert("Admin login required");
        return;
    }

    const addProductFormContainer = document.createElement("div");
    addProductFormContainer.id = "adminAddProductForm";

    addProductFormContainer.innerHTML = `
        <input placeholder = "Product name" id="productName">
        <input placeholder = "Price" id="productPrice" type="number">
        <input placeholder = "Stock" id="productStock" type="number">
        <input placeholder = "Category" id="productCategory">

        <button id="addProductButton">Add</button>
        <button id="cancelAddProductButton">Cancel</button>
    `;

    document.body.appendChild(addProductFormContainer);

    addProductFormContainer.querySelector("#addProductButton").onclick = async () => {
        const newProduct = {
            id: crypto.randomUUID(),
            name: productName.value,
            price: productPrice.value,
            stock: productStock.value,
            category: productCategory.value.toLowerCase(),
            image: "default.webp"
        };

       await window.adminProductService.addProduct(newProduct);
       const updatedProducts = await window.adminProductService.getAllProducts();
        window.allProductsData = updatedProducts;
        allProductsRef.length = 0;
        allProductsRef.push(...updatedProducts);
        currentVisibleProducts = [...updatedProducts];

        addProductFormContainer.remove();
        
        renderCategories(adminProductServiceRef, allProductsRef);
        renderProducts(currentVisibleProducts);
    };

    addProductFormContainer.querySelector("#cancelAddProductButton").onclick = () => {
        addProductFormContainer.remove();
    }
}

async function deleteProduct(productId)
{
    if (!authenticationService.isLoggedIn() || !authenticationService.isAdmin()) {
        alert("Admin login required");
        return;
    }

    if(!confirm("Delete This Product?"))
    {
        return;
    }

    // wait for deletion
    await window.adminProductService.deleteProduct(productId);
    // fetch fresh data
    const updatedProducts = await window.adminProductService.getAllProducts();

    // sync ALL references
    window.allProductsData = updatedProducts;
    allProductsRef.length = 0;
    allProductsRef.push(...updatedProducts);
    currentVisibleProducts = [...updatedProducts];

    // re-render UI
    renderCategories(adminProductServiceRef, allProductsRef);
    renderProducts(currentVisibleProducts);
}

function updateVisibleProducts() {
    const searchInputElement = document.getElementById("searchProduct");
    const categoryFilterElement = document.getElementById("categoryFilter");
    const productList = document.getElementById("productList");

    if (!searchInputElement || !categoryFilterElement || !productList) {
        return; 
    }

    const searchedProduct = searchInputElement.value.toLowerCase();
    const selectedCategory = categoryFilterElement.value;

    let filteredProducts = adminProductServiceRef.searchProductByName(allProductsRef, searchedProduct);
    filteredProducts = adminProductServiceRef.filterProductsByCategory(filteredProducts, selectedCategory);
    currentVisibleProducts = [...filteredProducts];
    
    renderProducts(currentVisibleProducts);
}
