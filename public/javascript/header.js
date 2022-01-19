//navbar logic
// fetch the nav
const navContainer = document.querySelector(".main-nav-container");

// fetch footer
const footerContainer = document.querySelector(".footer-container");

function navbarLogic(){
    const toggleBtn = document.querySelector(".menu-toggle");
    const mobileNavContainer = document.querySelector(".mobile-menu-container");

    toggleBtn.addEventListener("click", function(){
        // mobileNavUl.classList.toggle("showed-ul-mobile");
        toggleBtn.classList.toggle("rotated-btn-mobile-menu");
        const containerheight = mobileNavContainer.getBoundingClientRect().height
        if(containerheight === 0){
            mobileNavContainer.style.height = "20em";
        }
        else {
            mobileNavContainer.style.height = "0";
        }
        
    });

    // fixed navbar
    const mainNav = document.querySelector(".main-nav");
    window.addEventListener("scroll", function(){
        const scrolling = window.pageYOffset;
        if(scrolling>68){
            mainNav.classList.add("fixed-nav");
        }
        else {
            mainNav.classList.remove("fixed-nav");
        }
    })
}

//get navbar
fetch('assets/headernav.html')
.then(res => res.text())
.then(text => {
    navContainer.innerHTML = text;
    navbarLogic()
})

//get footer 
fetch('assets/footer.html')
.then(res => res.text())
.then(text => {
    footerContainer.innerHTML = text;
})