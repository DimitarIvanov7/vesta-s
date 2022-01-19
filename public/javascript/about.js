displayAnimation()
// googlemaps

function initMap() {
    let loc = {lat: 42.702724, lng: 23.332211}
    let map = new google.maps.Map(
        document.getElementById('map'), {zoom: 15, center: loc}
    );

    const iconImg = '/images/maps-marker-4.png';
        
    let marker = new google.maps.Marker({
        position: loc, 
        map: map,
        icon: iconImg
    })
}