class ProductService
{
    constructor()
    {
        this.products = [];
    }

    async getAllProducts()
    {
        const spinner = document.getElementById("spinner");
        
        try
        {
            if(spinner)
            {
                spinner.classList.remove("hidden"); 
                await new Promise(resolve => setTimeout(resolve, 1500));
            }

            const storedProducts = localStorage.getItem("products");

            if(storedProducts)
            {
                this.products = JSON.parse(storedProducts);
                return this.products;
            }
            
            const response = await fetch("./src/data/products.json");
            this.products = await response.json();  
            localStorage.setItem("products", JSON.stringify(this.products));

            return this.products;
        }
        catch(error)
        {
            throw error;
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
        localStorage.setItem("products", JSON.stringify(this.products));
    }
}

export default ProductService;
