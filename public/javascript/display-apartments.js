// map appartments and return html 
function appartsMap(apparts, i, filterOn){
    let title = apparts[i].Title;
    console.log(title);
    let picture = apparts[i].Images[0];
    let price = apparts[i].Prices;
    let size = apparts[i].Size;
    let location = apparts[i].Locations;
    let neighborhood = apparts[i].Neighborhoods;

    let animTag = "left-anim";
    let filterOff = "";

    if(i % 2 != 0){
        animTag = "right-anim";
        if(filterOn){
            filterOff = "right-anim-show";
        }
    }
    else if(filterOn){
        filterOff = "left-anim-show";
    }
    

    return `<div class="apartment id:${i+1} ${animTag} ${filterOff}" id=${i+1} data-location="${neighborhood}">
    <div class="top-part"style="background-image: url(${picture});
    background-repeat: no-repeat;
    background-size: cover;">
    
        <p class="top-offer">ТОП Оферта</p>
        <h1>${title}</h1>
        <div class="more-info">
            <p class="location">${location}</p>
            <p class="size">${size}</p>
            <p class="price">${price}</p>
        </div>
    </div>

</div> `
}

// display apparts first function 
function displayApparts(apparts, numberApart) {
    let displayList = []
    for(i = 0; i<numberApart; i++){
        displayList.push(appartsMap(apparts, i))
    }

    displayList = displayList.join("");

    container.innerHTML = displayList;
    // return displayList
}


// modal open / close
function openCloseModal(apparts){
    const appartmentsCont = document.querySelectorAll('.apartment');
    
    
    // open modal 
    appartmentsCont.forEach(function(element){
        element.addEventListener("click", function(){
            let apartId = element.id;
            let opened = window.open('');

            opened.document.write(getData(apparts, apartId-1));

            opened.document.close();
            
        });
    });

    // populate modal container with the specific data
    function getData(apparts, id){
        let firstPicture = apparts[id].Images[0]
        let pictures = apparts[id].Images
        let title = apparts[id].Title;
        let size = apparts[id].Size;
        let description = apparts[id].Description;
        let location = apparts[id].Locations;
        let type = apparts[id].Types;
        let price = apparts[id].Prices;
        let buildingType = apparts[id].BuildingTypes;
        let yearBuild = apparts[id].YearsBuild;
        let floor = apparts[id].Floors;
        let broker = apparts[id].BrokerContacts;
        let phoneContacts = apparts[id].PhoneContacts;
        let rooms = apparts[id].Rooms;
        let heating = apparts[id].Heatings;
        let neighborhood = apparts[id].Neighborhoods;

        let pictureHtml = "";

        let counterDots = "";

        let smallImages = "";

        pictures.forEach(function(picture){
            pictureHtml = pictureHtml + 
            `                <div class="slide">
                                <img class="slide-img" src="${picture}" alt="">
                            </div>`;

            counterDots = counterDots + `<span class="dot"></span>`

            smallImages = smallImages + `<img class="slide-img-mini" src="${picture}" alt=""></img>`
        });

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
            <link rel="stylesheet" href="/css/headernav.css">
            <link rel="stylesheet" href="/css/apartment.css">
            <link rel="stylesheet" href="/css/footer.css">
            <link rel="stylesheet" href="/css/all.css">
            <link rel="stylesheet" href="/css/scroll-animation.css">
            <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
            <script src="/javascript/display-apartments.js"></script>
            <script src="/javascript/display-animation.js"></script>
            
            <title>Имот за продажба</title>
        </head>
        <body>
            <div class="main-nav-container">
        
            </div>
            <div class="main-section">
                <div class="container-main">
                    <h1 class="main-title up-anim"><span>&nbsp &nbsp Имот за продажба № <span class="span-id">${id+1} &nbsp &nbsp</span></span></h1>
                    <div class="modal-container">
                        <div class="img-modal-container">
                            <div class="left-half">
                                <button class="btn-prev-modal"><i class="fas fa-angle-left fa-4x"></i></button>
                            </div>
                            <img class="img-modal" src="${firstPicture}" alt=""> 
                            <button class="close-btn-modal"><i class="fas fa-times fa-3x"></i></button>
                            <div class="right-half">
                                <button class="btn-next-modal"><i class="fas fa-angle-right fa-4x"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="main-slider-container">
                        <button class="prev"><i class="fas fa-angle-left fa-4x"></i></button>
                        <div class="slider-container up-anim">` + 
                        
                        `   ${pictureHtml}` + 
                        `</div>` +
                        `<button class="next"><i class="fas fa-angle-right fa-4x"></i></button>
                        
                    </div>

                    <div class="small-img-container">
                        ${smallImages}
                    </div>

                    <div class="counter-container">
                            ${counterDots}
                    </div>
            
                        
                    <div class="second-part">
                        <h1 class="second-title">${title}: ${price}</h1>
                        <p class="location-main"><span class="size-main">${size} - </span>${location}</p>
            
                        <div class="more-info-main">
                            <div class="more-info-left-col">
                                <div class="destription left-anim">
                                    <h3 class="h3-desc"><span>Описание</span> на имота</h3>
                                    <p class="description">${description}</p>         
                                </div>
                                
                                <div class="details-container left-anim">
                                    <div class="details-first-col">
                                        <h3 class="h3-details"><span>Основни</span> детайли</h3>
                                        <p>Вид на имота : <span>${type}</span></p>
                                        <p>Тип обява : <span>За продажба</span></p>
                                        <p>Цена : <span>${price}</span></p>
                                        <p>Вид строителство : <span>${buildingType}</span></p>
                                        <p>Година на построяване : <span>${yearBuild}</span></p>
                                    </div>
                                    <div class="details-second-col">
                                        <h3 class="h3-details"></h3>
                                        <p>Квартал : <span>${neighborhood}</span></p>
                                        <p>Етаж : <span>${floor}</span></p>
                                        <p>Площ : <span>${size}</span></p>
                                        <p>Брокер за контакт : <span>${broker}</span></p>
                                        <p>Телефон за контакт : <span>${phoneContacts}
                                        </span></p>
                                    </div>
                                    
                                    <div class="characteristics-container">
                                        <h3 class="h3-charact"><span>Характ</span>еристики</h3>
                                        <div class="characteristics">
                                            <p>Тип на имота : <span class="span-type">${rooms}</span></p>
                                            <p>Отопление : <span>${heating}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        
                            <div class="contact-container right-anim">
                                <h2>Изпрати запитване</h2>
                                <div class="contact-info-container">
                                    <p>${type} за продажба</p>
                                    <p>Площ: <span>${size}</span></p>
                                </div>
                                <p class="contact-price">${price}</p>
                                <form class="contact-input-container" action="/email" method="POST">
                                    <input type="text" id="subject" name="subject" value="Запитване ${title}">
                                    <input type="text" id="name" name="name" placeholder="Имена*">
                                    <input type="tel" id="tel" name="tel" placeholder="Телефон*">
                                    <input type="email" id="email" name="email" placeholder="Имейл*">
                                    <input type="text" id="message" name="message" placeholder="Съобщение">
                                    <button type="submit" class="contact">Свържи се С нас</button>
                               </form>
                                
                                
                            </div>

                            <div class="map-container">
                                <h2 id="lat-long">Приблизителна локация</h2>

                                <div id="map"></div>
                            </div>

                            <div class="similar-properties">
                                <h2><span>Подобни</span> имоти</h2>
                                <div class="similar-container">
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            
            <div class="footer-container">
            
            </div>
            <script async
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAcZRgMj9AOCjArpePUdt_nEvkRbf1B8B0&callback=initMap">
            </script>
    
            <script src="/javascript/apartment.js"></script>
            
        </body>
        </html>`
    }
    
}
