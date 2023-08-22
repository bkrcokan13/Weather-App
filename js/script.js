

function SearchCity(){
    var searchBox = document.getElementById('search_bar').value;
    if (searchBox == "") {
        console.log("Search box is empty");
    }
    else {
        console.log("Search Bar Text : " + searchBox);
    }

}


function getLocation() {
 
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getWeather);
    }
    else {
        alert("Geolocation is not supported by this browser.");
    }

    
}

function getWeather(lat,lon) {

    var tempatureSpan = document.getElementById("temp_deg");
    var city = document.getElementById("city");
    var blackBox = document.getElementById('black_box');
    

   
    
    
}



