var currentDayEl = document.querySelector('#currentDay');
var currentCityEl = document.querySelector('#currentCity');
var currentTemp = document.querySelector("#currentTemp");
var currentWind = document.querySelector("#currentWind");
var currentHumidity = document.querySelector("#currentHumidity");
var currentUV = document.querySelector("#currentUV");
// var cityName = document.getElementById("searchInput");
var searchButton = document.querySelector("#searchButton");

const WEATHER_API_KEY = "e6697eaac8204b597f028b08761fe308";


// displays the current day
function displayTime() {
    var rightNow = moment().format('dddd, MMMM Do, YYYY');
    currentDayEl.textContent = rightNow;
}

setInterval(displayTime, 1000);












searchButton.addEventListener("click", function getApi(event) {
    event.preventDefault();
    var cityName = document.querySelector("#searchInput");
    var searchTerm = cityName.value;
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


            var oneCallCoord = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=' + WEATHER_API_KEY;

            fetch(oneCallCoord)
                .then(function (response) {
                    return response.json();
                })


                .then(function (oneCallData) {
// Displays Current Weather Condition
                    console.log(oneCallData)
                    currentCityEl.textContent = searchTerm;
                    currentTemp.textContent = 'Temp: ' + oneCallData.current.temp + '°F';
                    currentWind.textContent = 'Wind: ' + oneCallData.current.wind_speed + 'MPH';
                    currentHumidity.textContent = 'Humidity: ' + oneCallData.current.humidity + '%';
                    currentUV.textContent = 'UV Index: ' + oneCallData.current.uvi;

                })
        });
}

);





//   searchButton.addEventListener("click", function getApi(event) {
//     event.preventDefault();
//     var cityName = document.querySelector("#searchInput");
//     var searchTerm = cityName.value;
//     // fetch request gets a list of all the repos for the node.js organization
//     var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchTerm + '&appid=' + WEATHER_API_KEY + '&units=imperial';
//   console.log(requestUrl)
//     fetch(requestUrl)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         console.log(data)
//     //     //Loop over the data to generate a table, each table row will have a link to the repo url
//     //     for (var i = 0; i < data.length; i++) {
//     //       // Creating elements, tablerow, tabledata, and anchor
//         //   var createTableRow = document.createElement('tr');
//     //       var tableData = document.createElement('td');
//     //       var link = document.createElement('a');

//     //       // Setting the text of link and the href of the link
//           currentWeather.textContent = 'Temp: ' + data.main.temp + '°F';
//     //       link.href = data[i].html_url;

//     //       // Appending the link to the tabledata and then appending the tabledata to the tablerow
//     //       // The tablerow then gets appended to the tablebody
//     //       tableData.appendChild(link);
//     //       createTableRow.appendChild(tableData);
//         //   currentDayEl.appendChild(createTableRow);
//         // }
//       });
//   }

//   );






















// const OPEN_WEATHER_API_KEY = "f32f339d5eda5e2a9a10c88456f2c076";




function setupSearchHandlers() {

    // Handle seaching by clicking button
    $(`#searchButton`).on("click", () => {
        getWeatherData($(`#searchInput`).val());
    });

    // Handle searching by clicking enter
    $(`#searchInput`).keypress((event) => {

        // If user pressed enter while on the form
        if (event.which == 13) {
            getWeatherData($(`#searchInput`).val());
        }
    })
}

// async function getWeatherData(city) {
//     var searchURI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=imperial`;

//     var result = await fetch(searchURI)
//         .then(response => response.json())
//         .then(data => {
//             return data;
//         });

//     var latLong = {
//         latitude: result.coord.lat,
//         longitude: result.coord.lon
//     }

//     var oneCallURI = `https://api.openweathermap.org/data/2.5/onecall?lat=${latLong.latitude}&lon=${latLong.longitude}&appid=${OPEN_WEATHER_API_KEY}`

//     var oneCall = await fetch(oneCallURI)
//         .then(response => response.json())
//         .then(data => {
//             return data;
//         })

//     console.log(oneCall);
//     var date = new Date(oneCall.current.dt * 1000);

//     var dateString = `(${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()})`;

//     $(`#cityName`).text(`${result.name} ${dateString}`);

//     $(`#temperature`).text(`Temp: ${result.main.temp} F`);
//     $(`#wind`).text(`Wind: ${result.wind.speed} MPH`);
//     $(`#humidity`).text(`Humidity: ${result.main.humidity} %`);
//     $(`#UVIndex`).text(`UV Index: ${oneCall.current.uvi}`)

// }

// function loadLastSearchedCity() {
//     return;
// }

// // Retrieve previous searches terms from localstorage and return them
// function getSearchHistory() {
//     var searchHistory = JSON.parse(localStorage.getItem("seaches"));

//     // If there is no array (first time accessing website)
//     // then create and save a new empty array
//     if (!searchHistory) {
//         searchHistory = ["Chapel Hill", "Carrboro", "Hillsborough"];
//         localStorage.setItem("searches", JSON.stringify(searchHistory));
//         return searchHistory;
//     } else {
//         return searchHistory;
//     }
// }

// // Load previous searches and render buttons elements 
// // on the homepage to search for those locations again
// function loadPreviousSearches() {

//     // Retrieve the most recent past searches
//     var searchHistory = getSearchHistory();

//     // Loop over each past search term in the data
//     searchHistory.forEach(searchString => {

//         // Create each search button dynamically from retrieved data
//         var searchButtonEl = $("<button></button>").text(searchString);
//         searchButtonEl.addClass("btn btn-secondary w-100 my-1");

//         // Append search buttons to container
//         $(`#previouslySearchedCitiesContainer`).append(searchButtonEl);

//     });
// }


// // Do any initialization and setup
// function init() {

//     // 1. Load previous searches and render buttons to search for those locations again
//     loadPreviousSearches();

//     // 2. Load the most recently searched city to the results screen as default
//     loadLastSearchedCity();

//     // 3. Set up event handlers for searching for a city
//     setupSearchHandlers();

// }

// // Start 'er up
// init();





// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city