class AdminModel extends UserModel
{
    constructor(name)
    {
        super(name, "admin");
    }

    addProduct(productService, product)
    {
        if(!this.isAdmin())
        {
            throw new AuthenticationError("Access denied. Admin only.");
        }
        
        return productService.addProduct(product);
    }
    
    deleteProduct(productService, productId)
    {
        if(!this.isAdmin())
        {
            throw new AuthenticationError("Access denied. Admin only.");
        }
        
        return productService.deleteProduct(productId);
    }
}
