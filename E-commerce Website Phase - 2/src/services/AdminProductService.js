import ProductService from "./ProductService.js";
import UserProductService from "./UserProductService.js";
import AuthenticationService from "./AuthenticationService.js";
const authenticationService = new AuthenticationService();

class AdminProductServices extends UserProductService
{
    async addProduct(product)
    {
        if (!authenticationService.isAdmin()) {
            alert("Unauthorized: Admin access required");
            throw new Error("Unauthorized: Admin access required");
        }
        
        await this.getAllProducts();
        
        return new Promise((resolve) => {
            setTimeout(() => {
                this.products.push({
                    ...product
                });

                this.saveProducts();
                resolve(this.products);
            }, 500);
        });
    }

    async updateProduct(productId, updatedData)
    {
        if (!authenticationService.isAdmin()) {
            alert("Unauthorized: Admin access required");
            throw new Error("Unauthorized: Admin access required");
        }

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
                resolve(this.products[productIndex]);
            }, 500);
        });
    }

    async deleteProduct(productId)
    {
        if (!authenticationService.isAdmin()) {
            alert("Unauthorized: Admin access required");
            throw new Error("Unauthorized: Admin access required");
        }

        await this.getAllProducts();

        return new Promise((resolve) => {
            setTimeout(() => {
                this.products = this.products.filter((product) => (
                    productId !== product.id
                ));

                this.saveProducts();
                resolve(this.products);
            }, 500);
        });
    }
}

export default AdminProductServices;