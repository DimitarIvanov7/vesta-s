// fetch to object
const getAppr = () => {
    return axios.get('./apparts.json')
        .then(function(res){
            return contentLoading(res.data)
        })
}

getAppr()

// load the appartments
const container = document.querySelector(".container");
// console.log(container)

function contentLoading (apparts){

    displayApparts(apparts, apparts.length);
    openCloseModal(apparts);
    filterFunc(apparts);
    searchByLocation();
    displayAnimation()
};

// search by location
function searchByLocation() {
    const mainContainer = document.querySelector(".container");
    let searchBar = document.querySelector("#search");
    const aparts = document.getElementsByClassName("apartment");

    const noResult = document.querySelector(".no-results");
    
    searchBar.addEventListener('keyup', function(){
        let filter = searchBar.value.toUpperCase();
        Array.from(aparts).forEach(function(apart){
            let apartLocation = apart.getAttribute('data-location');
            if(apartLocation.toUpperCase().includes(filter) === true){
                apart.style.display = "flex";
            }
            else {
                apart.style.display = "none";
            }
            if(mainContainer.offsetHeight===0){
                noResult.style.display = "block";
            }
            else{
                noResult.style.display = "none";
            }
        });
    });  
}

//make buttons active on click
const filterContainer = document.querySelector(".filters-container");
const btns = document.querySelectorAll("[data-id]");


filterContainer.addEventListener("click", function(button){
    const id = button.target.dataset.id;
    if(id === "btn"){
        btns.forEach(function(btn){
            btn.classList.remove('active');
            button.target.classList.add('active');
        })
    }
    else if(id === "btn-arr"){
        btns.forEach(function(btn){
            btn.classList.remove('active');
            button.target.parentElement.classList.add('active');
        })
    }
})

//filters
function filterFunc(apparts){

    // function for transitioning when changing content 
    function transitionOnFilters(display){
        mainContainer.style.opacity = 0;

        window.setTimeout(function () {
            mainContainer.innerHTML = display;
            mainContainer.style.opacity = 1;

            // displayAnimation()
            openCloseModal(apparts)
        },500)

    }
    
    // function to find all indexes of the elements to filter
    function findIndexes(myArr, element){
        let indices = [];
        let idx = myArr.indexOf(element);
        while (idx != -1) {
            indices.push(idx);
            idx = myArr.indexOf(element, idx + 1);
        }
        return indices
    }

    const mainContainer = document.querySelector(".container");

    let priceCounter = 2;

    //filter by price
    const priceFilterBtn = document.querySelector(".price-filter");

    priceFilterBtn.addEventListener("click", function(){
        let priceList = [];
        let sortedList = [];

        // priceArr.classList.toggle("rotated")

        priceFilterBtn.querySelector(".arrow-down").classList.toggle("rotated");

        // transfrom the price into a float number
        let appartsPrices = []
        for(let i = 0; i<apparts.length; i++){
            appartsPrices.push(apparts[i].Prices);
        }

        appartsPrices.forEach(function(price){
            let fixedStr = price.substring(1).replace(",", ".");
            priceList.push(parseFloat(fixedStr).toFixed(3));
            
        });

        if(priceCounter%2===0){
            priceList.sort(function(a,b){return a - b});
        }
        else {
            priceList.sort(function(a, b){return b-a});
        }

        // transfrom back to price
        priceList.forEach(function(price){
            let strNum = price.toString();
            sortedList.push("€" + strNum.replace(".", ","))
        });

        // console.log(sortedList);

        // find the indexes of the sorted items
        let indexes = [];
        let realIndexes = [];
        sortedList.forEach(function(item){
            let findingPrice = findIndexes(appartsPrices, item);
            realIndexes = realIndexes + indexes.concat(findingPrice + ",");
        });
        realIndexesPriceArr = realIndexes.split(",").map(function(item) {
            return parseInt(item, 10);
        });
        let uniqPrice = [...new Set(realIndexesPriceArr)]
        uniqPrice.pop()

        // console.log(uniqPrice);


        // call the display appartments function using the index list
        
        priceCounter+=1;
        let displayPrices = [];
        uniqPrice.forEach(function(index){
            // console.log("penis");
            displayPrices.push(appartsMap(apparts, index, "on"));
        });
        displayPrices = displayPrices.join("");

        transitionOnFilters(displayPrices);
        

        // call to Modal function to be able to open modals
        // openCloseModal(apparts)
    });

    // size filter
    const sizeFilterbtn = document.querySelector(".size-filter");
    let sizeCounter = 2;

    sizeFilterbtn.addEventListener("click", function(){
        
        let sizeList = [];
        let sortedSizeList = [];

        sizeFilterbtn.querySelector(".arrow-down").classList.toggle("rotated");

        let appartsSize = []
        for(let i = 0; i<apparts.length; i++){
            appartsSize.push(apparts[i].Size);
        }

        appartsSize.forEach(function(size){
            sizeList.push(parseInt(size.slice(0, -3)))
        });

        if(sizeCounter%2===0){
            sizeList.sort(function(a,b){return a - b});
        }
        else {
            sizeList.sort(function(a,b){return b - a});
        }


        sizeList.forEach(function(size){
            let strNumSize = size.toString();
            sortedSizeList.push(strNumSize + " м²")
        });

        // index findings
        let sizeIndexes = [];
        let realSizeIndexes = [];
        sortedSizeList.forEach(function(item){
            let finding = findIndexes(appartsSize, item);
            realSizeIndexes = realSizeIndexes + sizeIndexes.concat(finding + ",");
        });
        realIndexesArr = realSizeIndexes.split(",").map(function(item) {
            return parseInt(item, 10);
        });
        let uniq = [...new Set(realIndexesArr)]
        uniq.pop()
        // console.log(typeof uniq[1]);

        sizeCounter+=1;
        let displaySizes = [];
        uniq.forEach(function(index){
            // console.log("penis");
            displaySizes.push(appartsMap(apparts, index, "on"));
        });
        displaySizes = displaySizes.join("");

        transitionOnFilters(displaySizes);

        // call to Modal function to be able to open modals
        // openCloseModal(apparts)
    });


    //type filter
    const typeFilterbtn = document.querySelector(".type-filter");

    let typeCounter = 2;

    typeFilterbtn.addEventListener("click", function(){

        let typeList = [];

        typeFilterbtn.querySelector(".arrow-down").classList.toggle("rotated");


        let appartsTitle = []
        for(let i = 0; i<apparts.length; i++){
            appartsTitle.push(apparts[i].Title);
        }

        appartsTitle.forEach(function(type){
            typeList.push(type.charAt(0))
        });

        if(typeCounter%2===0){
            typeList.sort(function(a,b){return a - b});
        }
        else {
            typeList.sort(function(a,b){return b - a});
        }

    
        // find the indexes of the sorted list
        let indexListType = []
        typeList.forEach(function(type){
            appartsTitle.find(element => {
                if (element[0].includes(type)) {
                    indexListType.push((appartsTitle.indexOf(element)));
                }
            });
        });

        let uniqType = [...new Set(indexListType)]

        typeCounter+=1;

        let displayTypes = [];
        uniqType.forEach(function(index){
            displayTypes.push(appartsMap(apparts, index, "on"));
        });
        displayTypes = displayTypes.join("");

        transitionOnFilters(displayTypes);


        // call to Modal function to be able to open modals
        // openCloseModal(apparts)
    });


    // floor filter
    const floorFilterbtn = document.querySelector(".floor-filter");

    let floorCounter = 2;

    floorFilterbtn.addEventListener("click", function(){
    
        let floorList = [];

        floorFilterbtn.querySelector(".arrow-down").classList.toggle("rotated");

        let appartsFloors = []
        for(let i = 0; i<apparts.length; i++){
            appartsFloors.push(apparts[i].Floors);
        }

        appartsFloors.forEach(function(floor){
            if(floor.includes("/")){
                floorList.push(floor.substr(0, floor.indexOf('/')));
            }
            else {
                floorList.push(floor.charAt(0));
            }
            
        });

        console.log(floorList);

        if(floorCounter%2===0){
            floorList.sort(function(a,b){return a - b});
        }
        else {
            floorList.sort(function(a,b){return b - a});
        }

        // find the indexes of the sorted list
        let indexListFloor = []
        floorList.forEach(function(floor){
            let floorChars = floor.length;
            console.log(floorChars);
            appartsFloors.find(element => {
                if (element.substring(0, floorChars).includes(floor)) {
                    indexListFloor.push((appartsFloors.indexOf(element)));
                }
            });
        });

        console.log(indexListFloor);

        let uniqFloor = [...new Set(indexListFloor)];
        // let uniqueArray = Array.from(new Set(indexListFloor)); 

        console.log(uniqFloor);

        floorCounter+=1;

        let displayFloors = [];
        uniqFloor.forEach(function(index){
            displayFloors.push(appartsMap(apparts, index ,"on"));
        });
        displayFloors = displayFloors.join("");

        transitionOnFilters(displayFloors);
    });
}



