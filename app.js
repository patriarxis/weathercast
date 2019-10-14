window.addEventListener('load', ()=> {
    let lon;
    let lat;

    let descriptionSelector = document.querySelector(".description");
    let temperatureSelector = document.querySelector(".temperature");
    let locationSelector = document.querySelector(".location");
    
    let fiveDayTemps = new Array(5);

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

                /* Today's forecast and location */
                descriptionSelector.textContent = data.data[0].weather.description;
                locationSelector.textContent = data.city_name;


                /* Five Days Forecast */
                /* Get temp for the next five days */
                var i = 0;
                temp.forEach(function(element) {
                    fiveDayTemps[i] = data.data[i++].temp;
                });

                /* Apply temperatures */
                updateTemps();


                /* Get current day and four upcoming days */
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


    var dayDetails = document.querySelectorAll(".five-day-forecast ul li")
    var details = document.querySelectorAll(".details");
    let delay = 0;

    dayDetails[0].addEventListener('click', function() {
        if(details[0].classList.contains("show-details")) {
            delay = 300;
            details[0].classList.add("animate-details");
        } else {
            delay = 0;
            details[0].classList.remove("animate-details");
        }

        dayDetails[0].classList.toggle("active-day");
        
        setTimeout(function() {
            details[0].classList.toggle("show-details");
        }, delay);
    });
    dayDetails[1].addEventListener('click', function() {
        if(details[1].classList.contains("show-details")) {
            delay = 300;
            details[1].classList.add("animate-details");
        } else {
            delay = 0;
            details[1].classList.remove("animate-details");
        }

        dayDetails[1].classList.toggle("active-day");
        
        setTimeout(function() {
            details[1].classList.toggle("show-details");
        }, delay);
    });
    dayDetails[2].addEventListener('click', function() {
        if(details[2].classList.contains("show-details")) {
            delay = 300;
            details[2].classList.add("animate-details");
        } else {
            delay = 0;
            details[2].classList.remove("animate-details");
        }

        dayDetails[2].classList.toggle("active-day");
        
        setTimeout(function() {
            details[2].classList.toggle("show-details");
        }, delay);
    });
    dayDetails[3].addEventListener('click', function() {
        if(details[3].classList.contains("show-details")) {
            delay = 300;
            details[3].classList.add("animate-details");
        } else {
            delay = 0;
            details[3].classList.remove("animate-details");
        }

        dayDetails[3].classList.toggle("active-day");
        
        setTimeout(function() {
            details[3].classList.toggle("show-details");
        }, delay);
    });
    dayDetails[4].addEventListener('click', function() {
        if(details[4].classList.contains("show-details")) {
            delay = 300;
            details[4].classList.add("animate-details");
        } else {
            delay = 0;
            details[4].classList.remove("animate-details");
        }

        dayDetails[4].classList.toggle("active-day");
        
        setTimeout(function() {
            details[4].classList.toggle("show-details");
        }, delay);
    });
    

    
    /* Settings dropdown menu */
    var dropdown = document.querySelector(".dropdown");
    var openDropdown = document.getElementById("settings-btn");
    var closeDropdown = document.querySelector(".close-dropdown"); // Background div that tracks when user clicks away from dropdown

    /* When settings button is clicked show/hide dropdown and closeDropdown */
    openDropdown.addEventListener('click', function() {
        dropdown.classList.toggle("show-grid");
        closeDropdown.classList.toggle("show-block");
    });

    /* When user clicks away from dropdown hide both dropdown and closeDropdown */
    closeDropdown.addEventListener('click', function() {
        dropdown.classList.remove("show-grid");
        closeDropdown.classList.remove("show-block");
    });



    let scale = document.querySelector(".active");
    var buttons = document.querySelectorAll("#scale > button");
    var previous = 0;

    /* Celcius */
    buttons[0].addEventListener('click', function() {
        selectScale(0);
    });
    /* Fahrenheit */
    buttons[1].addEventListener('click', function() {
        selectScale(1);
    });
    /* Kelvin */
    buttons[2].addEventListener('click', function() {
        selectScale(2);
    });


    /* User select temp scale */
    function selectScale(current) { 
        buttons[previous].classList.remove('active');
        buttons[current].classList.add('active');
        previous = current;

        scale = document.querySelector(".active");

        updateTemps();
    }


    /* Update and apply temps */
    function updateTemps() {
        temperatureSelector.textContent = tempScale(fiveDayTemps[0] , scale.id);

        var i = 0;
        temp.forEach(function(element) {
            element.textContent = tempScale(fiveDayTemps[i++], scale.id);
        });
    }


    /* Calculate temp scale */
    function tempScale(temp, sc) {
        if (sc == "celcius") {
            return Math.round(temp) + "°";
        } else if (sc == "fahrenheit") {
            return Math.round((temp * 9/5) + 32) + "°";
        } else {
            return Math.round(temp + 273.15) + "K";
        }
    }
});