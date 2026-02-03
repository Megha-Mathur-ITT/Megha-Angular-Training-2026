import AuthenticationError from "/src/errors/AuthenticationError.js";
import OutOfStockError from "/src/errors/OutOfStockError.js";

const CART_KEY = "shopkro_cart";

class CartService {
    constructor(getProductsService, authenticationService) {
        this.getProducts = getProductsService;
        this.authenticationService = authenticationService;
        this.cart = this.loadCart();
    }

    loadCart() {
        const stored = localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    saveCart() {
        localStorage.setItem(CART_KEY, JSON.stringify(this.cart));
    }

    getCart() {
        return this.cart;
    }

    getTotalQuantity() {
        if (!this.authenticationService.isLoggedIn()) {
            return 0;
        }

        return this.cart.reduce((totalProducts, cartProduct) => (
            totalProducts + cartProduct.quantity
        ), 0);
    }

    async getAvailableStock(productId) {
        const products = await this.getProducts();
        const product = products.find(product => product.id === productId);

        if (!product) {
            return 0;
        }

        const cartProduct = this.cart.find((cartProduct) => (
            productId === cartProduct.id
        ));

        return (cartProduct ? product.stock - cartProduct.quantity : product.stock);
    }

    async addToCart(product) {
        try {
            this.ensureLoggedIn();

            const availableStock = await this.getAvailableStock(product.id);

            if (availableStock <= 0) {
                throw new OutOfStockError("Product is out of stock.");
            }

            const existingProduct = this.cart.find((cartProduct) =>
                (product.id == cartProduct.id)
            );

            if (existingProduct) {
                existingProduct.quantity++;
            }
            else {
                this.cart.push({ ...product, quantity: 1 });
            }

            this.saveCart();
        }
        catch (error) {
            alert(error.message);
            return;
        }
    }

    removeProduct(productId) {
        try {
            this.ensureLoggedIn();
        }
        catch (error) {
            alert(error.message);
            return;
        }

        this.cart = this.cart.filter((cartProduct) =>
            (cartProduct.id !== productId)
        );

        this.saveCart();
    }

    async increaseQuantity(productId) {
        try {
            this.ensureLoggedIn();

            const availableStock = await this.getAvailableStock(productId);

            if (availableStock <= 0) {
                throw new OutOfStockError("Product is out of stock.");
            }

            const product = this.cart.find((cartProduct) =>
                (productId == cartProduct.id)
            );

            if (!product) {
                return;
            }

            product.quantity++;
            this.saveCart();
        }
        catch (error) {
            alert(error.message);
            return;
        }
    }

    decreaseQuantity(productId) {
        try {
            this.ensureLoggedIn();

            const product = this.cart.find((cartProduct) =>
                (productId === cartProduct.id)
            );

            if (!product) {
                return;
            }

            product.quantity--;

            if (product.quantity <= 0) {
                this.removeProduct(productId);
            }

            this.saveCart();
        }
        catch (error) {
            alert(error.message);
            return;
        }
    }

    clearCart() {
        try {
            this.ensureLoggedIn();

            if (this.cart.length === 0) {
                throw new EmptyCartError("Cart is empty. Add products first.");
            }

            this.cart = [];
            localStorage.removeItem(CART_KEY);
        }
        catch (error) {
            alert(error.message);
            return;
        }
    }

    ensureLoggedIn() {
        if (!this.authenticationService.isLoggedIn()) {
            throw new AuthenticationError("Please login first.");
        }
    }
}

export default CartService;