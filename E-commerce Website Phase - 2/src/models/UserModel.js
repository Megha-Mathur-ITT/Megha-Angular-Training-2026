class UserModel
{
    constructor(name, role = "user")
    {
        this.name = name;
        this.role = role
    }

    isAdmin()
    {
        return this.role === "admin";
    }
}
