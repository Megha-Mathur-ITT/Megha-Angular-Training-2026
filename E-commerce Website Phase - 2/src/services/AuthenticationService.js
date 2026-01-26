import AuthenticationError from "../errors/AuthenticationError.js";
const AUTH_KEY = "shopkro_user";

const FIXED_USERS = [
    {
        name: "megha",
        password: "megha123",
        role: "user",
    },
    {
        name: "admin",
        password: "admin123",
        role: "admin",
    }
];

class AuthenticationService 
{
    constructor() 
    {
        this.currentUser = this.getCurrentUser();
    }

    login(name, password, role) 
    {
        if (!name || !password) 
        {
            throw new AuthenticationError("Name and password are required");
        }

        const matchedUser = FIXED_USERS.find((fixedUser) => (
            fixedUser.name == name.toLowerCase() &&
            fixedUser.password === password 
        ));

        if(!matchedUser)
        {
            throw new Error("Invalid credentials.");
        }

        const userToStore = {
            name: matchedUser.name,
            role: matchedUser.role
        };

        localStorage.setItem(AUTH_KEY, JSON.stringify(userToStore));
        this.currentUser = userToStore;

        return userToStore;
    }

    logout() 
    {
        localStorage.removeItem(AUTH_KEY);
        this.currentUser = null;
    }

    getCurrentUser() 
    {
        const stored = localStorage.getItem(AUTH_KEY);
        return stored ? JSON.parse(stored) : null;
    }

    isLoggedIn() 
    {
        return this.getCurrentUser() !== null;
    }

    isAdmin()
    {
        const user = this.getCurrentUser();
        return user?.role === "admin";
    }
}

export default AuthenticationService;