import ProductService from "./ProductService.js";

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
        if(selectedCategory == "all")
        {
            return productList;
        }
    
        const productsFiltered = productList.filter((product) => (
            product.category.toLowerCase() == selectedCategory.toLowerCase()
        ));

        return productsFiltered;
    }

    getCartQuantity(productId)
    {   
        const storedCart = localStorage.getItem("shopKro_cart");
        const cart = storedCart ? JSON.parse(storedCart) : [];
        const cartProduct = cart.find((cartProduct) => (cartProduct && productId == cartProduct.id));

        if(cartProduct && cartProduct.quantity > 0)
        {
            return cartProduct.quantity;
        }

        return 0;
    }

    getProductCategories(productList)
    {
        const categories = ["all"];

        for(let product of productList)
        {
            const category = product.category.toLowerCase();

            if(categories.includes(category))
            {
                continue;
            }

            categories.push(category);
        }        

        return categories;
    }

    isUserLoggedIn()
    {
        return !!localStorage.getItem("loggedInUser");
    }
}

export default UserProductService;