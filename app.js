window.addEventListener('load', ()=> {
    let lon;
    let lat;
    let descriptionSelector = document.querySelector(".description");
    let temperatureSelector = document.querySelector(".temperature");
    let locationSelector = document.querySelector(".location");

    let temp = document.querySelectorAll(".temp");
    let day = document.querySelectorAll(".day");
    let weatherImg = document.querySelectorAll(".weather-img");

    let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let date = new Date();
    let currentDay = date.getDay();


    /* Users Location */
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }

    function geoSuccess(position) {
        lon = position.coords.longitude;
        lat = position.coords.latitude;

        const api = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=e0befcd35dd548888966eebc1dd8f0da`;

        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {

                console.log(data);

                /* Today's Forecast */
                temperatureSelector.textContent = Math.round(data.data[0].temp) + "°";
                descriptionSelector.textContent = data.data[0].weather.description;
                locationSelector.textContent = data.city_name;


                /* Five Days Forecast */
                /* Get temp for the next five days */
                var i = 1;
                temp.forEach(function(element) {
                    element.textContent = Math.round(data.data[i++].temp) + "°";
                });


                /* Get current and four upcoming days */
                i = currentDay;
                day.forEach(function(element) {
                    element.textContent = week[i++%7];
                });
            });
    }

    function geoError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
        }
    }

    
    /* Elements clicked */
    document.getElementById("settings-btn").addEventListener('click', function() {
        document.querySelector(".settings").classList.toggle("enable");
    });
});