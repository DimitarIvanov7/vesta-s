



// mobile menu
const toggleBtn = document.querySelector(".menu-toggle");
const mobileNavContainer = document.querySelector(".mobile-menu-container")

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
console.log(mainNav);
window.addEventListener("scroll", function(){
    const scrolling = window.pageYOffset;
    if(scrolling>68){
        mainNav.classList.add("fixed-nav");
    }
    else {
        mainNav.classList.remove("fixed-nav");
    }
})




// slider apartments
const buttonPrev = document.querySelector(".prev");
const buttonNext = document.querySelector(".next");
const ApartSliderContainers = document.querySelectorAll(".slide"); 


// ApartSliderContainers.forEach(function(slide, index){
//     slide.style.left = `${index * 100}%`;
// });

let counter = 0;
buttonNext.addEventListener("click", function(){
    counter++;
    carouselAparts()
});

buttonPrev.addEventListener("click", function(){
    counter--;
    carouselAparts()
});

function carouselAparts(){
    // going back to the star /end
    if(counter === ApartSliderContainers.length){
        counter = 0;
    }
    if(counter <0) {
        counter = ApartSliderContainers.length-1;
    }


    ApartSliderContainers.forEach(function(slide){
        // slide.style.transform = `translateX(-${counter * 100}%)`

        slide.style.opacity = 0;

        window.setTimeout(function () {
            slide.style.transform = `translateX(-${counter * 100}%)`
            slide.style.opacity = 1;
        },500)
    })
}

//display top offers
const container = document.querySelector(".container-top-offers");

console.log(container);

// fetch to object
const getAppr = () => {
    return axios.get('./apparts.json')
        .then(function(res){
            return contentLoading(res.data)
        })
}

getAppr()


function contentLoading (apparts){

    displayApparts(apparts, 4);
    openCloseModal(apparts);
    displayAnimation()
};




// slider testimonials

const btnPrev = document.querySelector(".prevBtn");
const btnNext = document.querySelector(".nextBtn");
const sliderContainer = document.querySelectorAll(".slider-container-test");

// sliderContainer.forEach(function(slide, index){
//     slide.style.left = `${index * 100}%`;
// });

let counterTest = 0;
btnNext.addEventListener("click", function(){
    counterTest++;
    carouselTest()
});

btnPrev.addEventListener("click", function(){
    counterTest--;
    carouselTest()
});

function carouselTest(){
    // going back to the star /end
    if(counterTest === sliderContainer.length){
        counterTest = 0;
    }
    if(counterTest <0) {
        counterTest = sliderContainer.length-1;
    }


    sliderContainer.forEach(function(slide){
        slide.style.transform = `translateX(-${counterTest * 100}%)`
    })
}