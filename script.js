var currentDayEl = document.querySelector('#currentDay');
var currentCityEl = document.querySelector('#currentCity');
var currentWeather = document.querySelector(".currentWeather")
var searchButton = document.querySelector("#searchButton");
var fiveDayRow = document.querySelector(".row");
var forecast = document.querySelector(".forecast");
var selectCity = document.querySelector(".selectCity");
var cityButtons = document.querySelector(".cityButtons")
var searchHistory = [];
var searchTerm;

const WEATHER_API_KEY = "e6697eaac8204b597f028b08761fe308";

// displays the current day
function displayTime() {
    var rightNow = moment().format('dddd, MMMM Do, YYYY');
    currentDayEl.textContent = rightNow;
}
setInterval(displayTime, 1000);

// Start search when button is clicked
searchButton.addEventListener("click", function getCity(event) {
    event.preventDefault();
    var cityName = document.querySelector("#searchInput");
    var searchTerm = cityName.value;

    console.log(searchTerm)
    // Stores city name to local storage
    localStorage.setItem('searchTerm', searchTerm)
    searchHistory.push(searchTerm);
    localStorage.setItem('searchHistory', searchHistory)

    getApi();
    removeButtons();
    historyButtons();
})

function getApi() {
    var searchTerm = localStorage.getItem('searchTerm');

    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchTerm + '&appid=' + WEATHER_API_KEY + '&units=imperial';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            console.log(data)
            var latitude = data.coord.lat;
            var longitude = data.coord.lon;

            // performs onecall with latitude and longitude of searched city
            var oneCallCoord = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=' + WEATHER_API_KEY;

            fetch(oneCallCoord)
                .then(function (response) {
                    return response.json();
                })

                .then(function (oneCallData) {

                    console.log(oneCallData)
                    currentCityEl.textContent = '';
                    // Clears previous search data
                    while (currentWeather.firstChild) { currentWeather.removeChild(currentWeather.firstChild) }

                    // Displays Current Weather Condition
                    currentCityEl.textContent = searchTerm;
                    var currentTemp = document.createElement('p');
                    currentTemp.textContent = 'Temp: ' + oneCallData.current.temp + '°F';
                    currentWeather.appendChild(currentTemp);

                    var currentWind = document.createElement('p');
                    currentWind.textContent = 'Wind: ' + oneCallData.current.wind_speed + 'MPH';
                    currentWeather.appendChild(currentWind);

                    var currentHumidity = document.createElement('p');
                    currentHumidity.textContent = 'Humidity: ' + oneCallData.current.humidity + '%';
                    currentWeather.appendChild(currentHumidity);

                    var currentUV = document.createElement('p');
                    currentUV.textContent = 'UV Index: ' + oneCallData.current.uvi;
                    currentWeather.appendChild(currentUV);

                    // Gives background color corresponding to UV index intensity
                    if (oneCallData.current.uvi >= 0 && oneCallData.current.uvi <= 2) {
                        currentUV.setAttribute('class', 'green')
                    }
                    else if (oneCallData.current.uvi > 2 && oneCallData.current.uvi <= 5) {
                        currentUV.setAttribute('class', 'yellow')
                    }
                    else if (oneCallData.current.uvi > 5 && oneCallData.current.uvi <= 7) {
                        currentUV.setAttribute('class', 'orange')
                    }
                    else if (oneCallData.current.uvi > 7 && oneCallData.current.uvi <= 10) {
                        currentUV.setAttribute('class', 'red')
                    }
                    else {
                        currentUV.setAttribute('class', 'purple')
                    };

                    // Displays 5 Day Forecast
                    while (fiveDayRow.firstChild) { fiveDayRow.removeChild(fiveDayRow.firstChild) }
                    for (var i = 0; i < 5; i++) {
                        forecast.textContent = 'Five Day Forecast';

                        var createDay = document.createElement('div');
                        createDay.setAttribute('class', 'col day');
                        createDay.setAttribute('id', [i]);

                        var showDate = document.createElement('p');
                        var showDay = moment().add([i], 'days').format('MMMM Do, YYYY');
                        showDate.textContent = showDay;
                        createDay.appendChild(showDate);

                        var imgtag = document.createElement('img');
                        imgtag.setAttribute('src', 'https://openweathermap.org/img/wn/' + oneCallData.daily[i].weather[0].icon + '@2x.png')
                        createDay.append(imgtag);

                        // Created paragraph to display each day's temperature
                        var createTemp = document.createElement('p');
                        createTemp.textContent = 'Temp: ' + oneCallData.daily[i].temp.day + '°F';
                        createDay.appendChild(createTemp);

                        // Created paragraph to display each day's wind speed
                        var createWind = document.createElement('p');
                        createWind.textContent = 'Wind: ' + oneCallData.daily[i].wind_speed + 'MPH';
                        createDay.appendChild(createWind);

                        fiveDayRow.appendChild(createDay);
                    }
                })
        });

};

function init() {
    if (searchHistory) {
        var searchHistory = localStorage.getItem('searchHistory');
        historyButtons();
    } else {
        searchHistory = [];
    }
    console.log(searchHistory);
};

// Remove previous search results
function removeButtons() {
    if (cityButtons.firstChild !== null) {
    while (cityButtons.firstChild) { cityButtons.removeChild(cityButtons.firstChild) }
}};

//  Creates current search results
function historyButtons() {
    for (var i = 0; i < searchHistory.length; i++) {
        var createButton = document.createElement('button');
        // createButton.setAttribute("onclick", searchTerm.push(searchHistory[i]))        
        createButton.textContent = searchHistory[i];
        cityButtons.appendChild(createButton);
    }
};

init();




// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

//localstorage Search history not holding on reload
//set up history button to present conditions for selected city