import ProductService from "./services/ProductService/ProductService.js";
import UserProductService from "./services/UserService/UserProductService.js";
import AdminProductService from "./services/AdminService/AdminProductService.js";
import CartService from "./services/CartService/CartService.js";
import AuthenticationService from "./services/AuthenticationService/AuthenticationService.js";
import { initializeUserDropdown } from "./Ui/UserLogin/userAuthenticationUI.js";
import { renderCart, initializeCheckout } from "./Ui/CartUI/cartUI.js";
import { updateCartProductsCount } from "./services/CartService/updateCartProductsCountUI.js";
import { initializeUserProductPage } from "./Ui/UserUI/userProductsPage.js";
import {  initializeAdminProductsPage } from "./Ui/AdminUI/adminProductPage.js";

document.addEventListener("DOMContentLoaded", async () => {
    const authenticationService = new AuthenticationService();
    const productService = new ProductService();
    const adminProductService = new AdminProductService();
    const userProductService = new UserProductService();
    const cartService = new CartService(
        () => productService.getAllProducts(),
        authenticationService
    );
    
    window.cartService = cartService;
    window.adminProductService = adminProductService;
    window.userProductService = userProductService; 
    
    await productService.getAllProducts();

    renderCart();
    initializeCheckout();
    updateCartProductsCount();
    initializeUserDropdown(authenticationService);
    
    const currentUser = authenticationService.getCurrentUser();
    
    // User page
    if (document.getElementById("userProductsPage") && currentUser?.role !== "admin") {
        initializeUserProductPage(userProductService);
    }

    // Admin page
    if (document.getElementById("adminProductsPage") && currentUser?.role === "admin") {
        initializeAdminProductsPage(adminProductService);
    }   
});
