class ProductService
{
    constructor()
    {
        this.products = [];
        this.PRODUCT_STORAGE_KEY = "products";
    }

    async getAllProducts()
    {
        if(this.products.length)
        {
            return this.products;
        }

        const spinner = document.getElementById("spinner");
        
        try
        {
            if(spinner)
            {
                spinner.classList.remove("hidden"); 
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            
            const storedProducts = localStorage.getItem(this.PRODUCT_STORAGE_KEY);

            if(storedProducts)
            {
                this.products = JSON.parse(storedProducts);
                return this.products;
            }
            
            const response = await fetch("../../src/data/products.json");

            if(!response.ok)
            {
                throw new Error("Unable to fetch products");
            }

            this.products = await response.json();  
            this.saveProducts();

            return this.products;
        }
        catch(error)
        {
            alert(error.message);   
        }
        finally
        {
            if(spinner)
            {
                spinner.classList.add("hidden");
            }
        }
    }

    getProductById(productId)
    {
        return this.products.find((product) => (
            productId === product.id
        ));
    }

    saveProducts()
    {
        localStorage.setItem(this.PRODUCT_STORAGE_KEY, JSON.stringify(this.products));
    }
}

export default ProductService;
