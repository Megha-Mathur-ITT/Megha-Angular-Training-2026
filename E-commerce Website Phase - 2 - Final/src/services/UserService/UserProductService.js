import ProductService from "/src/services/ProductService/ProductService.js";

class UserProductService extends ProductService {
    searchProductByName(productList, searchedProduct)
    {
        searchedProduct = searchedProduct.trim().toLowerCase();

        if(searchedProduct == "")
        {
            return productList;
        }

        const productsFiltered = productList.filter((product) => (
            product.name.toLowerCase().includes(searchedProduct)
        ));

        return productsFiltered;
    }

    filterProductsByCategory(productList, selectedCategory)
    {
        if(selectedCategory === "all" || selectedCategory === "")
        {
            return productList;
        }
    
        let productsFiltered = productList.filter((product) => (
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        ));

        return productsFiltered;
    }

    getProductCategories(productList)
    {
        const categoriesSet = new Set(["all"]);

        for(let product of productList)
        {
            categoriesSet.add(product.category.toLowerCase());
        }        

        return Array.from(categoriesSet);
    }

    getCartQuantity(productId)
    {   
        const storedCart = localStorage.getItem("shopKro_cart");
        const cart = storedCart ? JSON.parse(storedCart) : [];
        const cartProduct = cart.find((cartProduct) => (productId == cartProduct?.id));

        if(cartProduct && cartProduct.quantity > 0)
        {
            return cartProduct.quantity;
        }

        return 0;
    }
}

export default UserProductService;
