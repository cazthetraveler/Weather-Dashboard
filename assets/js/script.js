const searchBtn = $("#search-button");
const cityInput = $("#city-input");

//local storage
let savedCities = [];

// this is a function that checks the weather and sets the appropriate icon
function weatherIconSet(weather) {
    switch (weather) {
        case "Thunderstorm":
            return "⛈";
        case "Drizzle":
        case "Rain":
            return "🌧";
        case "Snow":
            return "🌨";
        case "Clear":
            return "☀";
        case "Clouds":
            return "☁";
        case "Mist":
        case "Fog":
            return "🌫";
        case "Tornado":
            return "🌪";
        default:
            return "☀"
    };
};

searchBtn.on("click", function() {
    if (!cityInput.val()) {
        return;
    };

    $("#forecast-view").text("");
    const apiKey = "282d710887f9d5d5a0f6834957e54e94";
    let requestURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.val()}&appid=${apiKey}&units=imperial`;

    fetch(requestURL).then(function (response) {
        return response.json();
    }).then(function (data) {
        // current day information ------------------------------------------------
        $("#current-weather-view").css("display", "block");
        //city name
        $("#current-city").text(`${data.city.name}, ${data.city.country}`);
        //today's date
        $("#current-date").text(dayjs().format("MMMM D, YYYY"));
        // current weather type
        $("#current-icon").text(weatherIconSet(data.list[0].weather[0].main));
        // current weather type
        $("#current-weather").text(data.list[0].weather[0].main);
        // current temp
        $("#current-degree").text(`${Math.round(data.list[0].main.temp)}°F`);
        // current wind speed
        $("#current-wind").text(`Wind: ${data.list[0].wind.speed} MPH`);
        // current humidity
        $("#current-humid").text(`Humidity: ${data.list[0].main.humidity}%`);
        console.log(data);

        // 5 day forecast
        for (let i = 1; i < 6; i++) {
            var date = $("<h2>");
            var icon = $("<h2>").css("font-size", "3rem").css("font-weight", 200).css("line-height", "3rem");
            var temp = $("<h2>");
            var card = $("<div>").addClass("forecast-card");
            $("#forecast-view").css("display", "flex").append(card.append(date.text(dayjs().add(i, "day").format("MM/DD"))).append(icon.text(weatherIconSet(data.list[i].weather[0].main))).append(temp.text(`${Math.round(data.list[i].main.temp)}°F`)));
        };
        // also hide it here after pressing the search button lol
        if (window.innerWidth <= 1200) {
            $("#search-history").css("display", "none");
        }
        addButton();
    });
});

//if the user clicks on the search history buttons
$(document).on("click", ".search-history-button", function() {
    let savedCityName = $(this).attr("data-city");

    $("#forecast-view").text("");
    const apiKey = "282d710887f9d5d5a0f6834957e54e94";
    let requestURL = `https://api.openweathermap.org/data/2.5/forecast?q=${savedCityName}&appid=${apiKey}&units=imperial`;

    console.log(requestURL);

    fetch(requestURL).then(function (response) {
        return response.json();
    }).then(function (data) {
        // current day information ------------------------------------------------
        $("#current-weather-view").css("display", "block");
        //city name
        $("#current-city").text(`${data.city.name}, ${data.city.country}`);
        //today's date
        $("#current-date").text(dayjs().format("MMMM D, YYYY"));
        // current weather type
        $("#current-icon").text(weatherIconSet(data.list[0].weather[0].main));
        // current weather type
        $("#current-weather").text(data.list[0].weather[0].main);
        // current temp
        $("#current-degree").text(`${Math.round(data.list[0].main.temp)}°F`);
        // current wind speed
        $("#current-wind").text(`Wind: ${data.list[0].wind.speed} MPH`);
        // current humidity
        $("#current-humid").text(`Humidity: ${data.list[0].main.humidity}%`);
        console.log(data);

        // 5 day forecast
        for (let i = 1; i < 6; i++) {
            var date = $("<h2>");
            var icon = $("<h2>").css("font-size", "3rem").css("font-weight", 200).css("line-height", "3rem");
            var temp = $("<h2>");
            var card = $("<div>").addClass("forecast-card");
            $("#forecast-view").css("display", "flex").append(card.append(date.text(dayjs().add(i, "day").format("MM/DD"))).append(icon.text(weatherIconSet(data.list[i].weather[0].main))).append(temp.text(`${Math.round(data.list[i].main.temp)}°F`)));
        };
        // also hide it here after pressing the search button lol
        //if we're on a mobile device, hide the search history
        if (window.innerWidth <= 1199) {
            $("#search-history").css("display", "none");
        };
    });
});

// show search history when I click on input element
$("#city-input").on("click", function(event) {
    if (window.innerWidth <= 1199) {
        event.stopPropagation();
        $("#search-history").css("display", "flex");
    };
});



//then hide it when I click out of it
$(document).on("click", function(event) {
    if (window.innerWidth <= 1199) {
        if (!$(event.target).closest("#search-city-form").length && !$(event.target).closest("#search-history").length) {
            $("#search-history").css("display", "none");
        };
    };
});

$("#options-button").on("click", function() {
    $("main").css("display", "none");
    $("#options-menu").css("display", "flex");
})

function addButton() {
    savedCities.push(cityInput.val());
    localStorage.setItem("cities", JSON.stringify(savedCities));
    $("#search-history").text("");

    for (let i = 0; i < savedCities.length; i++) {
        $("#search-history").prepend($("<button>").addClass("search-history-button").attr("data-city", savedCities[i]).text(savedCities[i]));
    };

    cityInput.val("");
};


function renderButton() {
    const savedCitiesString = localStorage.getItem("cities");
    if (savedCitiesString) {
        savedCities = JSON.parse(savedCitiesString);
        for (let i = 0; i < savedCities.length; i++) {
            $("#search-history").prepend($("<button>").addClass("search-history-button").attr("data-city", savedCities[i]).text(savedCities[i]));
        };
    };
};

$("#clear-button").on("click", function() {
    localStorage.removeItem("cities");
});

renderButton();