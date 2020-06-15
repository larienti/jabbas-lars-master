function handleSubmit() {
     
    d3.event.preventDefault();

    // Select the input value from the form
    var hike = d3.select("#hike-form-input").node().value;
    console.log(hike);

    //IF INPUTTED VALUE (ZIPCODE_ EQUALS TO THE ZIPCODE STORED IN FLASK API
    //RETURN THE COORDINATES WHICH SHOULD RESULT INTO SOMETHING LIKE THIS:
    //userLocation = [40.027, -105.2519]

    // clear the input value
    d3.select("#hike-form-input").node().value = "";

    //create map according to latitude longitude 
    createMap(userLocation);

}

function createMap() {
    //rename #idname to the zip code ID
    var userZipCode = $('#idname').val();
    //transform user zip code to coordinates in this format userLocation = [lat,long]
    var userLocation = placeholder
    var hikeMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
    });

    var lightMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "pk.eyJ1IjoianVsaWFsZW9ub2ZmIiwiYSI6ImNrYXR6NnRwbTBmcWMyeW9jemdnaTJ2ajgifQ.HSHs0WzCPhklGQIJX2-J3A"
    }).addTo(hikeMap); 

    //userLocation = [40.027, -105.2519]
    const HIKE_API_KEY = "200794352-5993ea8c5073db58e8b8515192f76469"
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
                .bindPopup("<h3>" + trail.name + "</h3><p>" + `${trail.summary}` + "</p><hr>" + 
                "<p>" + `Condition: ${trail.conditionStatus}` + "</p></n>" + "<p>" + `Difficulty: ${trail.difficulty}` +
                "</p></n>" + "<p>" + `Rating: ${trail.stars} stars` + "</p>")
                .addTo(hikeMap)
                    
        }
    } 

}
