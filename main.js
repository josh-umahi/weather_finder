import apiKey from "./config.js";

function displayResults(data) {
    const cityName = data.name;
    const countryName = data.sys.country;
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const todaysHigh = data.main.temp_max;
    const todaysLow = data.main.temp_min;

    $("#cityAndCountry").html(`${cityName}, ${countryName}`);
    $("#icon").attr("src", `https://openweathermap.org/img/wn/${icon}.png`);
    $("#description").html(description);
    $("#temperature").html(`${temperature}\xB0C`);
    $("#humidity").html(`Humidity: ${humidity} %`);
    $("#windSpeed").html(`Wind Speed: ${windSpeed} km/h`);
    $("#todaysHigh").html(`Today's High: ${todaysHigh}\xB0C`);
    $("#todaysLow").html(`Today's Low: ${todaysLow}\xB0C`);

    const descriptionLowercase = description.toLowerCase()
    changeBodyImage(descriptionLowercase);
}

function submitSearch() {
    // Example Request:
    // https://api.openweathermap.org/data/2.5/weather?q=[cityName]&units=metric&appid=[apiKey]
    const cityName = $("#searchInput").val().trim();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

    $.get(url, function (data) {
        JSON.stringify(data);

        showShowSuggestionsButton();
        $("#weatherInfo").show()
        displayResults(data);
    });
}

const searchButton = document.getElementById('searchButton');
searchButton.onclick = () => submitSearch()

function changeBodyImage(descriptionLowercase) {
    let bgImageTitle;
    if (descriptionLowercase.includes("sky")) {
        bgImageTitle = "clear_sky.jpg"
    } else if (descriptionLowercase.includes("cloud")) {
        bgImageTitle = "clouds.jpg"
    } else if (descriptionLowercase.includes("rain")) {
        bgImageTitle = "rain.jpg"
    } else if (descriptionLowercase.includes("storm")) {
        bgImageTitle = "storm.jpg"
    } else if (descriptionLowercase.includes("snow")) {
        bgImageTitle = "snow.webp"
    } else if (descriptionLowercase.includes("mist") || descriptionLowercase.includes("haze")) {
        bgImageTitle = "mist.jpg"
    } else {
        bgImageTitle = "bg.jpg"
    }

    document.body.style.backgroundImage = `url(./images/${bgImageTitle})`;
}

function suggestedSearch(country) {
    console.log("object");
    $("#searchInput").val(country);
    submitSearch();
}

const searchLagos = document.getElementById('searchLagos');
const searchParis = document.getElementById('searchParis');
const searchAbuja = document.getElementById('searchAbuja');
const searchTokyo = document.getElementById('searchTokyo');
const searchLosAngeles = document.getElementById('searchLosAngeles');

searchLagos.onclick = () => suggestedSearch("lagos")
searchParis.onclick = () => suggestedSearch("paris")
searchAbuja.onclick = () => suggestedSearch("abuja")
searchTokyo.onclick = () => suggestedSearch("tokyo")
searchLosAngeles.onclick = () => suggestedSearch("los angeles")

function showSuggestionsDiv() {
    $("#showSuggestionButton").hide()
    $("#suggestionsOuterDiv").show()
}
const showSuggestionButton = document.getElementById('showSuggestionButton');
showSuggestionButton.onclick = () => showSuggestionsDiv()

function showShowSuggestionsButton() {
    $("#suggestionsOuterDiv").hide()
    $("#showSuggestionButton").show()
}

function allowEnterKeyPress() {
    // To allow users to search by pressing "Enter" on the #searchInput
    $("#searchInput").keypress(function (e) {
        if (e.which == 13) {
            submitSearch();
        }
    });
}

allowEnterKeyPress();