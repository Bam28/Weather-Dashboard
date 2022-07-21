var apiKey = config.API_KEY;
const citySearchButton = document.querySelector('#search');
let citySearch = document.querySelector('#search-result');


citySearchButton.addEventListener('click', function () {
    citySearch.value.toLowerCase()

   let requestCoordinate = 'http://api.openweathermap.org/geo/1.0/direct?q=' + citySearch.value + '&appid=' + apiKey;

    fetch(requestCoordinate)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        let longitudData = data[0].lon;
        let latitudeData = data[0].lat;
        responseCitySearch(longitudData, latitudeData);
        responseCityFiveDays(longitudData, latitudeData)
      })
    .catch(function () {
        console.log('Error')
    })
});

let responseCitySearch = (longitudData, latitudeData) => {
    let requestCurrentWeather = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitudeData + '&lon=' + longitudData + '&appid=' + apiKey + '&units=imperial'

    fetch(requestCurrentWeather)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let tempData = data.main.temp;
        let windData = data.wind.speed
        let humidityData = data.main.humidity

        let tempElement = document.querySelector('#temp')
        let windElement = document.querySelector('#wind')
        let humidityElement = document.querySelector('#humidity')

        tempElement.innerHTML = tempData
        windElement.innerHTML = windData
        humidityElement.innerHTML = humidityData
      })
    .catch(function () {
        console.log('Error')
    })
}

let responseCityFiveDays = (longitudData, latitudeData) => {
    let fiveDaysWeather = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitudeData + '&lon=' + longitudData + '&units=imperial&appid=' + apiKey;
    console.log(fiveDaysWeather)

    fetch(fiveDaysWeather)
    .then(function (response) {
        return response.json
    })
    .then(function (data) {
        console.log(data)
    })
}