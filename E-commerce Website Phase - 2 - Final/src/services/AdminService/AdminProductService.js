import UserProductService from "../UserService/UserProductService.js";
import AuthenticationService from "../AuthenticationService/AuthenticationService.js";
import InvalidQuantityError from "../../errors/InvalidQuantityError.js";
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
            
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const productIndex = this.products.findIndex((product) => (
                        product.id === productId
                    ));

                    if(productIndex === -1)
                    {
                        return reject(new Error("Product not found."));
                    }

                    this.products[productIndex] = {
                        ...this.products[productIndex], 
                        ...updatedData
                    };

                    this.saveProducts();
                    this.refreshProductsFromStorage(); 
                    
                    resolve(this.products[productIndex]);
                }, 500);
            });
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
            this.products = this.products.filter((product) => (
                                productId !== product.id
                            ));

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
}

export default AdminProductServices;
