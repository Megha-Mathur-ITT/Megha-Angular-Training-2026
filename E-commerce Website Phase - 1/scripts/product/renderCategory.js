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

function renderCategories()
{
    const categoryFilterElement = document.getElementById("categoryFilter");
    categoryFilterElement.innerHTML = "";
    const categories = getProductCategories(allProductsData);

    for(let category of categories)
    {
        const categoryOption = document.createElement("option");
        categoryOption.value = category;
        categoryOption.textContent = category;
        categoryFilterElement.appendChild(categoryOption);
    }
}

renderCategories();