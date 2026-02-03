export function initializeUserDropdown(authenticationService) {
    const userImage = document.getElementById("userImage");
    const userDropdown = document.getElementById("userDropdown");

    if (!userImage || !userDropdown) {
        console.warn("User dropdown elements not found");
        return;
    }

    userImage.addEventListener("click", () => {
        userDropdown.classList.toggle("hidden");
        renderUserDropdown();
    });

    function renderUserDropdown() 
    {
        if (!authenticationService.isLoggedIn()) 
        {
            userDropdown.innerHTML = `<button id="loginBtn">Login</button>`;
            document.getElementById("loginBtn")
                ?.addEventListener("click", showLoginForm);
        }
        else 
        {
            userDropdown.innerHTML = `
                <p>Hi, ${authenticationService.getCurrentUser().name}</p>
                <button id="logoutBtn">Logout</button>
            `;
            
            document.getElementById("logoutBtn")
                ?.addEventListener("click", () => {
                    authenticationService.logout();

                    userDropdown.classList.add("hidden");
                    alert("Logged out successfully");
                    window.location.href = "index.html";
            });
        }
    }

    function showLoginForm() {
        userDropdown.innerHTML = `
            <form id="loginForm">
                <input id="loginEmail" placeholder="Email" type="email" required>
                <input id="loginPassword" type="password" placeholder="Password" required>
                <button id="submitLogin" type="submit">Login</button>
            </form>
        `;

        document.getElementById("loginForm")
            ?.addEventListener("submit", handleLogin);
    }

    async function handleLogin(e) {
        e.preventDefault();

        try 
        {
            const loginEmail = document.getElementById("loginEmail");
            const loginPassword = document.getElementById("loginPassword");
            
            const user = await authenticationService.login(
                loginEmail.value,
                loginPassword.value,
            );

            alert(`Logged in as ${user.role}`);

            if(user.role === "admin")
            {
                window.location.href = "adminProducts.html";
            }
            else
            {
                window.location.href = "products.html";
            }
            
            renderUserDropdown();
        } 
        catch (error) 
        {
            alert(error.message);
        }
    }
}
