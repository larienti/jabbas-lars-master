fetch('/zipcodes').then(data=>data.json()).then(d=>{
    console.log(d);
    
    var button = d3.select("#button").on("click", getCoordinates);
    var form = d3.select("#form").on("submit", getCoordinates);

    function getCoordinates() {

        d3.event.preventDefault();

        var hikeInput = d3.select("#hike-form-input")
        var hikeValue = hikeInput.property("value");

        d3.select("#hike-form-input").node().value = "";

        var coordinates = [];

        d.forEach((zipcode) => {
            if (hikeValue == zipcode.zip) {
                coordinates.push(zipcode.lat);
                coordinates.push(zipcode.lon);
            }
        });

        createMap(coordinates)
    }

    function createMap(coordinates) { 
        
        document.getElementById('map-try').innerHTML="<div id='map'></div>";

        var hikeMap = L.map("map", {
            center: coordinates,
            zoom: 8,
        });

        var lightMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/outdoors-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: MAP_API_KEY
        }).addTo(hikeMap); 

        userLocation = coordinates;

        userTrails = `https://www.hikingproject.com/data/get-trails?lat=${userLocation[0]}`+`&lon=${userLocation[1]}`+`&maxDistance=25&maxResults=15&key=${HIKE_API_KEY}`

        d3.json(userTrails, function(data) {
        
            console.log(data); //the whole dictionary
            createMarkers(data.trails); //just trail dictionary

        });

        function createMarkers(marker) {
        
            console.log(marker); //just trail dictionary

            for (var i = 0; i < marker.length; i++) {
                var trail = marker[i];
                L.marker([trail.latitude, trail.longitude])
                    .bindPopup("<h3>" + trail.name + "</h3><p>" + trail.summary + "</p><img src=" + 
                    trail.imgSqSmall + " alt='broken' height=150/><hr>" + 
                    "<p>" + `Condition: ${trail.conditionStatus}` + "</p></n>" + "<p>" + `Difficulty: ${trail.difficulty}` +
                    "</p></n>" + "<p>" + `Rating: ${trail.stars} stars` + "</p>")
                    .addTo(hikeMap)
                    
            }
        } 

    }
    
});


