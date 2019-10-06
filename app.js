window.addEventListener('load', ()=> {
    let lon;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimeZone = document.querySelector(".location-timezone");
    let weatherIcon = document.querySelector(".weather-icon");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");


    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }

    function geoSuccess(position) {
        lon = position.coords.longitude;
        lat = position.coords.latitude;

        const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=60d1fe7b8d05e121e8fa735c8b7e2f6d`;

        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const { temp } = data.main;
                const { description, icon } = data.weather[0];

                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = description;
                locationTimeZone.textContent = data.timezone;
                weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                let celcius = Math.round((temp - 273.15) * 100) / 100;
                let fahrenheit = Math.round((temp * 9/5 - 459.67) * 100) / 100;

                temperatureSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = celcius;
                    } else if (temperatureSpan.textContent === "C") {
                        temperatureSpan.textContent = "K";
                        temperatureDegree.textContent = temp;
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = fahrenheit;
                    }
                })
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
});