import ProductService from "./services/ProductService.js";
import UserProductService from "./services/UserProductService.js";
import AdminProductService from "./services/AdminProductService.js";
import CartService from "./services/CartService.js";
import AuthenticationService from "./services/AuthenticationService.js";
import { initializeUserDropdown } from "./UiLogics/userDropdown.js";
import { renderCart, initializeCheckout } from "./UiLogics/cartUI.js";
import { updateCartProductsCount } from "./UiLogics/cartCountUI.js";
import { initializeUserProductPage } from "./UiLogics/userProductsPage.js";
import { initAdminProductsPage } from "./UiLogics/adminProductPage.js";

document.addEventListener("DOMContentLoaded", () => {

    const productService = new ProductService();
    const authenticationService = new AuthenticationService();
    const cartService = new CartService(() => window.allProductsData, authenticationService);
    
    window.cartService = cartService;
    let allProductsData = [];
    
    renderCart();
    initializeCheckout();
    updateCartProductsCount();
    
    productService.getAllProducts()
        .then((products) => {
            allProductsData.push(...products);

            const adminProductService = new AdminProductService(allProductsData);
            const userProductService = new UserProductService(allProductsData);
            window.userProductService = userProductService; 
            window.adminProductService = adminProductService;
            window.allProductsData = allProductsData;
            
            const currentUser = authenticationService.getCurrentUser();

            // User page
            if (document.getElementById("userProductsPage") && currentUser?.role !== "admin") {
                initializeUserProductPage(window.userProductService, allProductsData);
            }

            // Admin page
            if (document.getElementById("adminProductsPage") && currentUser?.role === "admin") {
                initAdminProductsPage(window.adminProductService, allProductsData);
            }   

        })
        .catch(console.error);

    initializeUserDropdown(authenticationService);
});
