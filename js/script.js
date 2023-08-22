

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
        navigator.geolocation.getCurrentPosition(
            (postion) =>{
                getWeather(
                    postion.coords.latitude, 
                    postion.coords.longitude
                )
            },

            (errorCallBack) =>{
                console.error("Error, location not founded");
            }
        );
    }
    else {
        alert("Geolocation is not supported by this browser.");
    }

    
}

function getWeather(lat,lon) {

    var tempatureSpan = document.getElementById("temp_deg");
    var city = document.getElementById("city");
    var blackBox = document.getElementById('black_box');
    const container = document.getElementById('bg_container');


    const weatherCodesPicture = {
        0:"img/sunny.jpg",
        1:"img/sunny.jpg",
        2:"img/cloudly.jpg",
        3:"img/cloudly.jpg",
        45:"img/foggy.jpg",
        48:"img/foggy.jpg",
        51:"img/rainly.jpg",
        53:"img/rainly.jpg",
        55:"img/rainly.jpg",
        95:"img/rainly.jpg",
        96:"img/rainly.jpg",
        99:"img/rainly.jpg",
    }


    const weatherCodesMap = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog and depositing rime fog",
        48: "Fog and depositing rime fog",
        51: "Drizzle: Light intensity",
        53: "Drizzle: Moderate intensity",
        55: "Drizzle: Dense intensity",
        95: "Thunderstorm: Slight or moderate",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail"
    };

    
    

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`)
    .then((response) => {
           return response.json();
        }
    ).then(
        (data)=> {
            let weathercode =  data.daily.weathercode[0];
            let weatherTime = data.daily.time[0];

            // Min and Max temp's
            let minTemp, maxTemp;

            minTemp = data.daily.temperature_2m_min[0] + '\u2103';
            maxTemp = data.daily.temperature_2m_max[0] + '\u2103';

            // Disable Display None
            blackBox.style.display = "unset";




            // Check weather status
            const weatherStats = weatherCodesMap[weathercode];

            // Change Background
            container.style.backgroundImage = `url(${weatherCodesPicture[weathercode]})`;

            // Get city name
            const cityName = data.timezone.split('/')[1];

            tempatureSpan.innerText = `Min: ${minTemp} - Max: ${maxTemp}`
            city.innerText = cityName;


            
            

        }
    )
}



