//This function is meant to pull data from the OpenWeather API and return an error message if not applicable
function fetchWeatherData(cityName) {
    const apiKey = 'cad915e5b671c44cd5b08d6834576efe'
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
        
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            displayWeatherForecast(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeatherForecast(weatherData) {
    
    const forecastList = weatherData.list.slice(0, 5); 

    forecastList.forEach(forecast => {
        const date = new Date(forecast.dt * 1000); 
        const temperature = forecast.main.temp;
        const humidity = forecast.main.humidity;
        const windSpeed = forecast.wind.speed;
        const weatherIcon = forecast.weather[0].icon;

        
        console.log('Date:', date);
        console.log('Temperature:', temperature);
        console.log('Humidity:', humidity);
        console.log('Wind Speed:', windSpeed);
        console.log('Weather Icon:', weatherIcon);
    });
}





//This code is meant to gather the current day forcast as well as input the various data need for the forcast
function currentDay(data, city) {
    var date = new Date((data.current.dt * 1000) - (data.timezone_offset * 1000))
    var icon = data.current.weather[0].icon;
    var currentyCityEl = document.getElementById("currentCity");
    var currentDateEl = document.getElementById("currentDate");
    var currentIconEl = document.getElementById("currentIcon");
    var currentTempEl = document.getElementById("currentTemp");
    var currentHumidityEl = document.getElementById("currentHumidity");
    var currentWindEl = document.getElementById("currentWind");
    currentyCityEl.textContent = city;
    currentDateEl.textContent = date.toLocaleDateString("en-US");
    currentIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
    currentTempEl.textContent = data.current.temp;
    currentHumidityEl.textContent = data.current.humidity;
    currentWindEl.textContent = data.current.wind_speed;
}
//This string od code is meant to make the 5 day forecast data and fill it in the appropiate lists meant to be cards 
function fiveDay(data) {
    for(var i = 1; i < 6; i++) {
        var date = new Date((data.daily[i].dt * 1000) - (data.timezone_offset * 1000));
        var icon = data.daily[i].weather[0].icon;
        var dateEl = document.getElementById("date" + i);
        var iconEl = document.getElementById("icon" + i);
        var tempEl = document.getElementById("temp" + i);
        var humidityEl = document.getElementById("humidity" + i);
        var windEl = document.getElementById("wind" + i);
        dateEl.textContent = date.toLocaleDateString('en-US');
        iconEl.setAttribute('scr', "https://openweathermap.org/img/wn/" + icon + "@2x.png");
        tempEl.textContent = "Temp: " + data.daily[i].temp.day + "°F";
        humidityEl.textContent = "Humidity: " + data.daily[i].humidity + "%";
        windEl.textContent = "Wind Spd: " + data.daily[i].wind_speed + "mph";

        forecastEl.classList.remove('hidden');
    }
}
//These next functions save, update and load any previous city looked at 
function saveHistory(city) {
    if(!historyArray) {
       historyArray = [city];
    } else {
        historyArray.unshift(city);
    };

    if(historyArray.length > 5) {
        var delExtra = historyArray.pop();
    }

    localStorage.setItem('history', JSON.stringify(historyArray));
}


function loadHistory() {
    var historyArray = JSON.parse(localStorage.getItem('history'));
}

function updateHistory() {
    if(historyArray !== null) {
        for(var i = 0; i < historyArray.length; i++) {
            var historyBtn = document.getElementById('btn' + i);
            historyBtn.textContent = historyArray[i];
            historyBtn.addEventListener('click', function() {convertHistorySearch(event.target)});
        }
    }
}

searchBtn.addEventListener('click', search);
input.addEventListener('keypress', function (event) {
    if(event.key === "Enter") {
        document.getElementById('searchBtn').click();
    }
});

loadHistory();
updateHistory();