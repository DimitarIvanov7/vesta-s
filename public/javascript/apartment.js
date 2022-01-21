// change html
function changeHtml(html){
    document.getElementsByTagName("html")[0].innerHTML = html;
}

const container = document.querySelector(".similar-container");

// fetch to object
const getAppr = () => {
    return axios.get('./apparts.json')
        .then(function(res){
            return contentLoading(res.data)
        })
}

getAppr()


function contentLoading (apparts){

    displayCustomApparts(apparts, apparts.length);
    openCloseModal(apparts);
    displayAnimation()
};


// display apparts first function 
function displayCustomApparts(apparts, numberApart) {
    const spanType = document.querySelector(".span-type").innerHTML;

    let displayList = [];
    let counterAparts = 0;
    let mainCounter = 0;

    let startHere = document.querySelector(".span-id").innerHTML;

    while(mainCounter <2){
        for(let i = parseInt(startHere); i<numberApart; i++){
            let rooms = apparts[i].Rooms;
            if(rooms===spanType){

                displayList.push(appartsMap(apparts, i));
                counterAparts+=1;
                if(counterAparts===3){
                    mainCounter =2;
                    i = numberApart;

                }
            }
        }

        startHere = 0;
    }

    uniqDisplay = [...new Set(displayList)];

    uniqDisplay = uniqDisplay.join("");

    container.innerHTML = uniqDisplay;

}




// fetch the nav
const navContainer = document.querySelector(".main-nav-container");

// fetch footer
const footerContainer = document.querySelector(".footer-container");


//get navbar
fetch('assets/headernav.html')
.then(res => res.text())
.then(text => {
    navContainer.innerHTML = text;
    navbarLogic()
});

//get footer 
fetch('assets/footer.html')
.then(res => res.text())
.then(text => {
    footerContainer.innerHTML = text;
});

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


// slider apartments
const buttonPrev = document.querySelector(".prev");
const buttonNext = document.querySelector(".next");
const ApartSliderContainers = document.querySelectorAll(".slide"); 

//counter-dots
const counterDots = document.querySelectorAll(".dot");

counterDots[0].classList.add("active");


ApartSliderContainers.forEach(function(slide, index){
    slide.style.left = `${index * 100}%`;
});

let counter = 0;
buttonNext.addEventListener("click", function(){
    counter++;
    if(counter === ApartSliderContainers.length){
        counter = 0;
    }
    carouselAparts(counter)
});

buttonPrev.addEventListener("click", function(){
    counter--;
    if(counter <0) {
        counter = ApartSliderContainers.length-1;
    }
    carouselAparts(counter)
});

function carouselAparts(counter){

    ApartSliderContainers.forEach(function(slide){
        slide.style.transform = `translateX(-${counter * 100}%)`
    })

    counterDots.forEach(function(dot, index){
        dot.classList.remove("active");

        if(index === counter){
            dot.classList.add("active")
        };
    });
}

// bigger image on click
const slideImg = document.querySelectorAll(".slide-img");
const modalContainer = document.querySelector(".modal-container");
const imgModal = document.querySelector(".img-modal");
const closeModalBtn = document.querySelector(".close-btn-modal");
const nextModalBtn = document.querySelector(".btn-next-modal");
const prevModalBtn = document.querySelector(".btn-prev-modal");
const screenSize = window.innerWidth;

//open
slideImg.forEach(function(img, index){
    img.addEventListener("click", function(){
        let scrollPos = window.scrollY;
        console.log(scrollPos);
        modalContainer.style.top = scrollPos + "px";
        imgModal.src = img.src;
        
        if(screenSize>845){
            modalContainer.style.opacity = "100";
            modalContainer.style.zIndex  = "99";
            document.body.style.overflow = "hidden";
            changeImgModal(index);
        }
    });
});

//next and prev btns
function changeImgModal(index){
    nextModalBtn.addEventListener("click", function(){
        index ++;
        if(index===slideImg.length){
            index=0;
        };

        imgModal.src = slideImg[index].src;
        
    });

    prevModalBtn.addEventListener("click", function(){
        index --;
        if(index<0){
            index=slideImg.length-1;
        };
        imgModal.src = slideImg[index].src;
    });
};


// close
closeModalBtn.addEventListener("click", function(){
    modalContainer.style.opacity = "0";
    modalContainer.style.zIndex  = "-1";
    document.body.style.overflow = "scroll";
});


//mini images 
const containerMain = document.querySelector(".container-main");
const miniImg = document.querySelectorAll(".slide-img-mini");

counterDots.forEach(function(dot, index){
    dot.addEventListener("mouseover", function(){
        let dotPosition = dot.getBoundingClientRect().x

        let containerWidth = containerMain.clientWidth;
        let bodyWidth = document.body.clientWidth

        console.log(containerWidth + " body: " + bodyWidth);
        miniImg[index].style.left = dotPosition-(bodyWidth-containerWidth)/2 - 40+ "px";
        miniImg[index].classList.add("mini-img-actve");
    });

    dot.addEventListener("mouseout", function(){
        miniImg[index].classList.remove("mini-img-actve");
    });

    dot.addEventListener("click", function(){

        console.log(index);
        counter = index;
        carouselAparts(index);
    });
});

//send inquiries
const inputForm = document.querySelector(".contact-input-container");

inputForm.addEventListener('submit', ()=>{
    alert("Имейлът е изпратен, очаквайте отговор")
    window.location.href = window.location.href;
});


//google maps
const addresApart = document.querySelector(".location-main").innerHTML;

function initMap(appLoc) {
    let map = new google.maps.Map(
        document.getElementById('map'), {zoom: 15, center: appLoc}
    );

    const iconImg = '/images/maps-marker-4.png';
        
    let marker = new google.maps.Marker({
        position: appLoc, 
        map: map,
        icon: iconImg
    })
}

//call GeoCode
geocode()
function geocode(){
    let location = addresApart;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params:{
            address:location,
            key:'AIzaSyAcZRgMj9AOCjArpePUdt_nEvkRbf1B8B0'
        }
    })
    .then(function(response){
        console.log(response);
        let geometry = response.data.results[0].geometry.location;
        return initMap(geometry)
    })
};
