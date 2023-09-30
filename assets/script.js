// GIVEN a weather dashboard with form inputs

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var currentDay = dayjs().format("(MM/DD/YYYY)");
var tomorrowDay = dayjs().add(1, "day").format("MM/DD/YYYY");
var dayPlus2 = dayjs().add(2, "day").format("MM/DD/YYYY");
var dayPlus3 = dayjs().add(3, "day").format("MM/DD/YYYY");
var dayPlus4 = dayjs().add(4, "day").format("MM/DD/YYYY");
var dayPlus5 = dayjs().add(5, "day").format("MM/DD/YYYY");

var cityInput = $("#city-input");

var searchBtn = $("#search-button");

var laterForecastEl = $("#5-day-heading");

var searchHistory = $("#search-history");
var displayResult = $("#display-result");


var savedCities = []; //for local storage eventually

searchBtn.click (function() {
    var requestURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput.val() + "&appid=282d710887f9d5d5a0f6834957e54e94";
    console.log(requestURL);

    fetch(requestURL).then(function (response) {
        return response.json();
    }).then(function (data) {

        var cityHeadingEl = $("#city-name");
        var cityTempEl = $("#temp");
        var cityWindEl = $("#wind");
        var cityHumidityEl = $("#humidity");

        var degree = (data.list[0].main.temp - 273.15) * 1.8 + 32; //kelvin to fahrenheit formula
        var degreeConvert = (Math.round(degree * 100) / 100).toFixed(2);

        var weather = data.list[0].weather[0].main;
        var weatherIcon;

        var cityName = data.city.name;
        var cityWind = data.list[0].wind.speed;
        var cityHumidity = data.list[0].main.humidity;

        if (weather == "Thunderstorm") {
            weatherIcon = "🌩";
        } else if (weather == "Drizzle") {
            weatherIcon = "🌧"
        } else if (weather == "Rain") {
            weatherIcon = "⛆"
        } else if (weather == "Snow") {
            weatherIcon = "🌨"
        } else if (weather == "Clear") {
            weatherIcon = "🌣"
        } else if (weather == "Clouds") {
            weatherIcon = "🌤"
        };

        cityHeadingEl.text(cityName + " " + currentDay + " " + weatherIcon);
        cityTempEl.text("Temp: " + degreeConvert + "°F");
        cityWindEl.text("Wind: " + cityWind + " MPH");
        cityHumidityEl.text("Humidity: " + cityHumidity + "%");
        displayResult.attr("class", "border p-3");

        //show 5day forecast

        laterForecastEl.text("5-Day Forecast:");

        $(".card").css("display", "block");

        var laterDateEl = $("#day-1 #later-date");
        var laterIconEl = $("#day-1 #later-icon");
        var laterTempEl = $("#day-1 #later-temp");
        var laterWindEl = $("#day-1 #later-wind");
        var laterHumidityEl = $("#day-1 #later-humidity");

        var laterWeather = data.list[1].weather[0].main;
        var laterDegree = (data.list[1].main.temp - 273.15) * 1.8 + 32;
        var laterDegreeConvert = (Math.round(laterDegree * 100) / 100).toFixed(2);
        var laterWind = data.list[1].wind.speed;
        var laterHumidity = data.list[1].main.humidity;

        if (laterWeather == "Thunderstorm") {
            weatherIcon = "🌩";
        } else if (laterWeather == "Drizzle") {
            weatherIcon = "🌧"
        } else if (laterWeather == "Rain") {
            weatherIcon = "⛆"
        } else if (laterWeather == "Snow") {
            weatherIcon = "🌨"
        } else if (laterWeather == "Clear") {
            weatherIcon = "🌣"
        } else if (laterWeather == "Clouds") {
            weatherIcon = "🌤"
        };

        laterDateEl.text(tomorrowDay);
        laterIconEl.text(weatherIcon);
        laterTempEl.text("Temp: " + laterDegreeConvert + "°F");
        laterWindEl.text("Wind: " + laterWind + " MPH");
        laterHumidityEl.text("Humidity: " + laterHumidity + "%");

        //day2

        laterDateEl = $("#day-2 #later-date");
        laterIconEl = $("#day-2 #later-icon");
        laterTempEl = $("#day-2 #later-temp");
        laterWindEl = $("#day-2 #later-wind");
        laterHumidityEl = $("#day-2 #later-humidity");

        laterWeather = data.list[2].weather[0].main;
        laterDegree = (data.list[2].main.temp - 273.15) * 1.8 + 32;
        laterDegreeConvert = (Math.round(laterDegree * 100) / 100).toFixed(2);
        laterWind = data.list[2].wind.speed;
        laterHumidity = data.list[2].main.humidity;

        if (laterWeather == "Thunderstorm") {
            weatherIcon = "🌩";
        } else if (laterWeather == "Drizzle") {
            weatherIcon = "🌧"
        } else if (laterWeather == "Rain") {
            weatherIcon = "⛆"
        } else if (laterWeather == "Snow") {
            weatherIcon = "🌨"
        } else if (laterWeather == "Clear") {
            weatherIcon = "🌣"
        } else if (laterWeather == "Clouds") {
            weatherIcon = "🌤"
        };

        laterDateEl.text(dayPlus2);
        laterIconEl.text(weatherIcon);
        laterTempEl.text("Temp: " + laterDegreeConvert + "°F");
        laterWindEl.text("Wind: " + laterWind + " MPH");
        laterHumidityEl.text("Humidity: " + laterHumidity + "%");
        
        //day3

        laterDateEl = $("#day-3 #later-date");
        laterIconEl = $("#day-3 #later-icon");
        laterTempEl = $("#day-3 #later-temp");
        laterWindEl = $("#day-3 #later-wind");
        laterHumidityEl = $("#day-3 #later-humidity");

        laterWeather = data.list[3].weather[0].main;
        laterDegree = (data.list[3].main.temp - 273.15) * 1.8 + 32;
        laterDegreeConvert = (Math.round(laterDegree * 100) / 100).toFixed(2);
        laterWind = data.list[3].wind.speed;
        laterHumidity = data.list[3].main.humidity;

        if (laterWeather == "Thunderstorm") {
            weatherIcon = "🌩";
        } else if (laterWeather == "Drizzle") {
            weatherIcon = "🌧"
        } else if (laterWeather == "Rain") {
            weatherIcon = "⛆"
        } else if (laterWeather == "Snow") {
            weatherIcon = "🌨"
        } else if (laterWeather == "Clear") {
            weatherIcon = "🌣"
        } else if (laterWeather == "Clouds") {
            weatherIcon = "🌤"
        };

        laterDateEl.text(dayPlus3);
        laterIconEl.text(weatherIcon);
        laterTempEl.text("Temp: " + laterDegreeConvert + "°F");
        laterWindEl.text("Wind: " + laterWind + " MPH");
        laterHumidityEl.text("Humidity: " + laterHumidity + "%");

        //day4

        laterDateEl = $("#day-4 #later-date");
        laterIconEl = $("#day-4 #later-icon");
        laterTempEl = $("#day-4 #later-temp");
        laterWindEl = $("#day-4 #later-wind");
        laterHumidityEl = $("#day-4 #later-humidity");

        laterWeather = data.list[4].weather[0].main;
        laterDegree = (data.list[4].main.temp - 273.15) * 1.8 + 32;
        laterDegreeConvert = (Math.round(laterDegree * 100) / 100).toFixed(2);
        laterWind = data.list[4].wind.speed;
        laterHumidity = data.list[4].main.humidity;

        if (laterWeather == "Thunderstorm") {
            weatherIcon = "🌩";
        } else if (laterWeather == "Drizzle") {
            weatherIcon = "🌧"
        } else if (laterWeather == "Rain") {
            weatherIcon = "⛆"
        } else if (laterWeather == "Snow") {
            weatherIcon = "🌨"
        } else if (laterWeather == "Clear") {
            weatherIcon = "🌣"
        } else if (laterWeather == "Clouds") {
            weatherIcon = "🌤"
        };

        laterDateEl.text(dayPlus4);
        laterIconEl.text(weatherIcon);
        laterTempEl.text("Temp: " + laterDegreeConvert + "°F");
        laterWindEl.text("Wind: " + laterWind + " MPH");
        laterHumidityEl.text("Humidity: " + laterHumidity + "%");

        //day5

        laterDateEl = $("#day-5 #later-date");
        laterIconEl = $("#day-5 #later-icon");
        laterTempEl = $("#day-5 #later-temp");
        laterWindEl = $("#day-5 #later-wind");
        laterHumidityEl = $("#day-5 #later-humidity");

        laterWeather = data.list[5].weather[0].main;
        laterDegree = (data.list[5].main.temp - 273.15) * 1.8 + 32;
        laterDegreeConvert = (Math.round(laterDegree * 100) / 100).toFixed(2);
        laterWind = data.list[5].wind.speed;
        laterHumidity = data.list[5].main.humidity;

        if (laterWeather == "Thunderstorm") {
            weatherIcon = "🌩";
        } else if (laterWeather == "Drizzle") {
            weatherIcon = "🌧"
        } else if (laterWeather == "Rain") {
            weatherIcon = "⛆"
        } else if (laterWeather == "Snow") {
            weatherIcon = "🌨"
        } else if (laterWeather == "Clear") {
            weatherIcon = "🌣"
        } else if (laterWeather == "Clouds") {
            weatherIcon = "🌤"
        };

        laterDateEl.text(dayPlus5);
        laterIconEl.text(weatherIcon);
        laterTempEl.text("Temp: " + laterDegreeConvert + "°F");
        laterWindEl.text("Wind: " + laterWind + " MPH");
        laterHumidityEl.text("Humidity: " + laterHumidity + "%");

    });
});