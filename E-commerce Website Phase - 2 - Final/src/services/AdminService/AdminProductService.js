import UserProductService from "../UserService/UserProductService.js";
import InvalidQuantityError from "../../errors/InvalidQuantityError.js";
import AuthenticationService from "../AuthenticationService/AuthenticationService.js";
const authenticationService = new AuthenticationService();

class AdminProductServices extends UserProductService
{
    validateProduct(product) {
        const { name, category, stock, price } = product;

        if (!name?.trim() || !category?.trim() || stock === "" || price === "") 
        {
            throw new Error("All fields are required.");
        }

        if (stock < 0) 
        {
            throw new InvalidQuantityError("Stock cannot be negative");
        }

        if (price < 0) 
        {
            throw new InvalidQuantityError("Price cannot be negative");
        }
    }

    async addProduct(product)
    {
        try
        {
            if (!authenticationService.isAdmin()) {
                throw new Error("Unauthorized: Admin access required");
            }
            
            this.validateProduct(product);  
            await this.getAllProducts();

            this.products.push(product);
            this.saveProducts();
            this.refreshProductsFromStorage(); 

            return this.products;
        }      
        catch(error)
        {
            alert(error.message);
        }
    }

    async updateProduct(productId, updatedData)
    {
        try
        {    
            if (!authenticationService.isAdmin()) {
                throw new Error("Unauthorized: Admin access required");
            }

            this.validateProduct(updatedData);
            await this.getAllProducts();    
            this.buildProductMap();
                
            const existingProduct = this.productMap.get(productId);

            if(!existingProduct)
            {
                return new Error("Product not found.");
            }

            const updatedProduct = {
                ...existingProduct,
                ...updatedData
            };

            this.productMap.set(productId, updatedProduct);
            this.products = Array.from(this.productMap.values());
            
            this.saveProducts();
            this.refreshProductsFromStorage();
                    
            return updatedProduct;
        }
        catch(error)
        {
            alert(error.message);
        }
    }

    async deleteProduct(productId)
    {
        try
        {    
            if (!authenticationService.isAdmin()) {
                throw new Error("Unauthorized: Admin access required");
            }

            await this.getAllProducts();
            this.buildProductMap();
            
            const isDeleted = this.productMap.delete(productId);

            if(!isDeleted)
            {
                throw new Error("Product not found.");
            }

            this.products = Array.from(this.productMap.values());

            this.saveProducts();
            this.refreshProductsFromStorage();
            
            return this.products;
        }
        catch(error)
        {
            alert(error.message);
        }
    }

    refreshProductsFromStorage() {
        this.products = JSON.parse(localStorage.getItem("shopkro_products")) || [];
    }

    buildProductMap() {
        this.productMap = new Map(this.products.map(product => 
            [product.id, product]
        ));
    }
}

export default AdminProductServices;
