mapboxgl.accessToken = 'pk.eyJ1Ijoid2FkZXJvZ2VycyIsImEiOiJjbDJ4enpxc3UxMHB5M2JvYnN2a3Y1aDRtIn0.wefdEXZql8zqblSHI9uJtw';
let markerObjects = [];
let marker;

async function run() {
    // get bus data    
    const locations = await getBusLocations();

    locations.forEach(function(location, i) {
        const busInService = markerObjects.find(element => {
            return element.id === location.id;
        });
        if (busInService) {
            busInService.obj.setLngLat([location.attributes.longitude, location.attributes.latitude]);
            busInService.obj.setPopup(new mapboxgl.Popup().setHTML(`
                <h6> Route Number - ${location.attributes.label.toUpperCase()}</h6>`))
                .addTo(map);
        } else {
            pinMarker(location);
        }
    });
    setTimeout(run, 6000);
}

async function getBusLocations() {
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json = await response.json();
    return json.data;
}

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.092761, 42.357575],
    zoom: 13,
});

let pinMarker = location => {
    if (location.attributes.occupancy_status == 'FULL') {
        markercolor = '#f90611';
    } else if (location.attributes.occupancy_status == 'FEW_SEATS_AVAILABLE') {
        markercolor = '#eca713';
    } else {
        markercolor = '#30d629';
    }

    marker = new mapboxgl.Marker({
            color: markercolor,
        }).setLngLat([location.attributes.longitude, location.attributes.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`
            <h6>Route Number - ${location.attributes.label.toUpperCase()}</h6>`))
        .addTo(map);

    markerObjects.push({
        id: location.id,
        obj: marker,
    });

};

run();