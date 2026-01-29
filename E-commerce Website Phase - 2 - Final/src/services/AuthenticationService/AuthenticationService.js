import User from "/src/models/UserModel.js";
import Admin from "/src/models/AdminModel.js";
import AuthenticationError from "/src/errors/AuthenticationError.js";

const AUTH_KEY = "shopkro_user";
const USERS_DATA_URL = "../src/data/usersData.json";

class AuthenticationService 
{
    constructor() 
    {
        this.currentUser = this.getCurrentUser();
    }

    async loadUsers()
    {
        const response = await fetch(USERS_DATA_URL);

        try
        {
            if(!response.ok)
            {
                throw new Error("Unable to load users data.");
            }
            else
            {
                return response.json();
            }
        }
        catch(error)
        {
            alert(error.message);
        }
    }

    async login(email, password) 
    {
        if (!email || !password) 
        {
            throw new AuthenticationError("Email and password are required");
        }

        const users = await this.loadUsers();

        const matchedUser = users.find((user) => (
            user.email === email &&
            user.password === password 
        ));

        if(!matchedUser)
        {
            throw new AuthenticationError("Invalid email or password.");
        }

        let loggedInUser;

        if(matchedUser.role === "admin")
        {
            loggedInUser = new Admin(matchedUser.name, matchedUser.email, matchedUser.role);
        }
        else
        {
            loggedInUser = new User(matchedUser.name, matchedUser.email, matchedUser.role);
        }

        localStorage.setItem(AUTH_KEY, JSON.stringify({
            id: matchedUser.id,
            name: matchedUser.name,
            email: matchedUser.email,
            role: matchedUser.role
        }));

        this.currentUser = loggedInUser;

        return loggedInUser;
    }

    logout() 
    {
        localStorage.removeItem(AUTH_KEY);
        this.currentUser = null;
    }

    getCurrentUser() 
    {
        const stored = localStorage.getItem(AUTH_KEY);

        if(!stored)
        {
            return null;
        }

        const user = JSON.parse(stored);
        
        if(user.role === "admin")
        {
            return new Admin(user.name, user.email, user.role);
        }
        else
        {
            return new User(user.name, user.email, user.role);
        }
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