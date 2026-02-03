import { createProductCard, renderCategories } from "../../utils/productUi.shared.js";
import AuthenticationService from "../../services/AuthenticationService/AuthenticationService.js";

const authenticationService = new AuthenticationService();
let adminProductServiceRef = null;

export function initializeAdminProductsPage(adminProductService, allProductsData) {
    if (!authenticationService.isLoggedIn() || !authenticationService.isAdmin()) {
        window.location.href = "products.html";
        return; 
    }

    adminProductServiceRef = adminProductService;

    const searchInputElement = document.getElementById("searchProduct");
    const categoryFilterElement = document.getElementById("categoryFilter");
    const productList = document.getElementById("productList");

    if (!searchInputElement || !categoryFilterElement || !productList) {
        return; 
    }
    
    searchInputElement.addEventListener("input", updateVisibleProducts);
    categoryFilterElement.addEventListener("change", updateVisibleProducts);
    
    refreshUI();
}

async function refreshUI()
{
    const searchedProduct = document.getElementById("searchProduct")?.value.toLowerCase();
    const selectedCategory = document.getElementById("categoryFilter")?.value;
    
    let products = await adminProductServiceRef.getAllProducts();
    renderCategories(adminProductServiceRef, products);

    products = adminProductServiceRef.searchProductByName(products, searchedProduct);
    products = adminProductServiceRef.filterProductsByCategory(products, selectedCategory);

    renderAdminProductSection(products);
}

async function renderAdminProductSection(productList)
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
        const productCard = await createProductCard(product, true, {
            onEdit: showEditProductForm,
            onDelete: deleteProduct,
        },
        window.cartService
        );

        productsListContainer.appendChild(productCard);
    }
}

function renderAddNewProductButton()
{
    if (document.getElementById("adminAddNewProductContainer"))
    {
        return;
    }
    
    const productsListContainer = document.getElementById("productList");
    const addNewProductContainer = document.createElement("div");
    addNewProductContainer.id = "adminAddNewProductContainer";
    addNewProductContainer.innerHTML = `<button id="addNewProductButton">Add new Product</button>`;
    addNewProductContainer.title = "Add new product";

    addNewProductContainer.addEventListener("click", showAddNewProductForm);
    productsListContainer.appendChild(addNewProductContainer)
}

function ensureAdmin() {
    if (!authenticationService.isLoggedIn() || !authenticationService.isAdmin()) 
    {
        throw new Error("Admin login required");
    }
}

function buildProductFormHTML(product = {})
{
    return `
        <label for="productName">Product Name:
        <input value="${product.name ? product.name : ""}" id="productName">

        <label for="productPrice">Product Price:
        <input value="${product.price ? product.price : ""}" id="productPrice">

        <label for="productStock">Product Stock:
        <input value="${product.stock ? product.stock : ""}" id="productStock">

        <label for="productCategory">Product Category:
        <input value="${product.category ? product.category : ""}" id="productCategory">

        <button id="submitProductButton">Save</button>
        <button id="cancelProductButton">Cancel</button>
    `;
}

function readProductFormData(productFormContainer) {
    return {
        name: productFormContainer.querySelector("#productName").value,
        price: productFormContainer.querySelector("#productPrice").value,
        stock: productFormContainer.querySelector("#productStock").value,
        category: productFormContainer.querySelector("#productCategory").value.toLowerCase()
    };
}

function attachFormAction(productFormContainer, onSubmit)
{
    productFormContainer.querySelector("#submitProductButton").onclick = async () => {
        await onSubmit(readProductFormData(productFormContainer));

        productFormContainer.remove();
    };

    productFormContainer.querySelector("#cancelProductButton").onclick = () => {
        productFormContainer.remove();
    };
}

function showEditProductForm(product)
{   
    try
    {
        ensureAdmin();

        const productFormContainer = document.createElement("div");
        productFormContainer.id = "adminAddProductForm";
        productFormContainer.innerHTML = buildProductFormHTML(product);        

        attachFormAction(productFormContainer, async (data) => {
            await adminProductServiceRef.updateProduct(product.id, data);

            refreshUI();
        });

        document.body.appendChild(productFormContainer);
    }
    catch(error)
    {
        alert(error.message);
    }
} 

function showAddNewProductForm()
{
    try
    {
        ensureAdmin();

        const productFormContainer = document.createElement("div");
        productFormContainer.id = "adminAddProductForm";
        productFormContainer.innerHTML = buildProductFormHTML();

        attachFormAction(productFormContainer, async (data) => {
            await adminProductServiceRef.addProduct({
                id: crypto.randomUUID(),
                ...data,
                image: "default.webp"
            });

            refreshUI();
        })

        document.body.appendChild(productFormContainer);
    }
    catch(error)
    {
        alert(error.message);
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

    await adminProductServiceRef.deleteProduct(productId);
    refreshUI();
}

async function updateVisibleProducts() {
    const searchInputElement = document.getElementById("searchProduct");
    const categoryFilterElement = document.getElementById("categoryFilter");

    if (!searchInputElement || !categoryFilterElement) {
        return; 
    }

    const searchedProduct = searchInputElement.value.toLowerCase();
    const selectedCategory = categoryFilterElement.value;

    let products = await adminProductServiceRef.getAllProducts();
    products = adminProductServiceRef.searchProductByName(products, searchedProduct);
    products = adminProductServiceRef.filterProductsByCategory(products, selectedCategory);
    
    renderAdminProductSection(products);
}
