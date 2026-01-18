function getProductCategories(productList)
{
    const categories = ["all"];

    for(let product of productList)
    {
        const category = product.category;

        if(categories.includes(category))
        {
            continue;
        }

        categories.push(category);
    }        

    return categories;
}

function searchProductByName(productList, searchedProduct)
{
    searchedProduct = searchedProduct.trim().toLowerCase();

    if(searchedProduct == "")
    {
        return productList;
    }

    const productsFound = productList.filter((product) => (
        product.name.toLowerCase().includes(searchedProduct)
    ));

    return productsFound;
}

function filterProductsByCategory(productList, category)
{
    if(category == "all")
    {
        return productList;
    }
    
    const productsFound = productList.filter((product) => (
        product.category.toLowerCase() == category.toLowerCase()
    ));

    return productsFound;
}
