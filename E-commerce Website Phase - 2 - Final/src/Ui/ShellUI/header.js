const hamburger = document.getElementById("hamburger");
const navItems = document.querySelector("#navbar nav");

if(hamburger && navItems)
{
    hamburger.addEventListener("click", () => {
        navItems.classList.toggle("active");
    });
}
