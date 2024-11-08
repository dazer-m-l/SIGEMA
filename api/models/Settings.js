document.addEventListener('DOMContentLoaded', () => {

    // Colors
    let defaultColor = "rgb(11, 11, 11)"; // Color of the page
    let lightBgColor = "rgb(242, 242, 242)"; 
    let darkColor = "rgb(11, 11, 11)";
    let lightColor = "rgb(242, 242, 242)";
    const thmBtn = document.getElementById("changeThemeButton"); 

    thmBtn.addEventListener("click", () => {
        // Elements that change
        let bg = document.body;
        
        // Change to light color 
        if (bg.style.backgroundColor === "" || bg.style.backgroundColor === defaultColor) {
             
            bg.style.backgroundColor = lightBgColor;
        }
        // Change to dark color
        else {
            bg.style.backgroundColor = defaultColor; 
        }
    })
})