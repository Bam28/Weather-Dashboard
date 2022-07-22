var apiKey = config.API_KEY;
const citySearchButton = document.querySelector('#search');
let citySearch = document.querySelector('#search-result');
let cityElement = document.querySelector('#city')
let cityHistory = document.querySelector('#city-history-list')
let cityFiveDayWeather = document.querySelector('#five-day-forcast')


citySearchButton.addEventListener('click', function () {
    citySearch.value.toLowerCase()
    cityElement.innerHTML = citySearch.value;
    saveCity(citySearch.value)

   let requestCoordinate = 'http://api.openweathermap.org/geo/1.0/direct?q=' + citySearch.value + '&appid=' + apiKey;

    fetch(requestCoordinate)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let longitudData = data[0].lon;
        let latitudeData = data[0].lat;
        responseCitySearch(longitudData, latitudeData);
        everythingCitySearch(longitudData, latitudeData)
        // responseCityFiveDays(longitudData, latitudeData)
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

let everythingCitySearch = (longitudData, latitudeData) => {
    let requesFiveDays = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + longitudData + '&lon=' + longitudData +'&exclude=current,minutely,hourly,alerts&units=imperial&appid=' + apiKey
    console.log(requesFiveDays)

    fetch(requesFiveDays)
    .then(function(response) {
        return response.json()
    })
    .then(function (data) {
        for(let i = 1; i <= 5; i++){
        console.log(data.daily[i].dt)
        let timestampSeconds = data.daily[i].dt
        let futureDate = new Date(timestampSeconds*1000);
        let dayForcast = document.createElement('ul')
        
        let tempData = data.daily[i].temp.day;
        let windData = data.daily[i].wind_speed
        let humidityData = data.daily[i].humidity

        let tempElement = document.createElement('li')
        let windElement = document.createElement('li')
        let humidityElement = document.createElement('li')

        tempElement.innerHTML = `Temp: ${tempData}`
        windElement.innerHTML =`Wind: ${windData}`
        humidityElement.innerHTML = `Humidity: ${humidityData}`

        dayForcast.classList.add('day-forcast')
        dayForcast.appendChild(tempElement)
        dayForcast.appendChild(windElement)
        dayForcast.appendChild(humidityElement)
        cityFiveDayWeather.appendChild(dayForcast)


        console.log("Date Timestamp:",futureDate.getTime())
        console.log(futureDate)
    }
    })
    .catch(function () {
        console.log('Error 5 days')
    })
}


let saveCity = (city) => {
    let key = city.substring(0, 3);
    localStorage.setItem(key, city);
    let cityHistoryItem = document.createElement('li');
    cityHistoryItem.classList.add('city-history');
    cityHistoryItem.appendChild(document.createTextNode(city));
    cityHistory.appendChild(cityHistoryItem);
};

// // Button function to clear local storage and clear contents
// $("#clearFieldsBtn").click(function (event) {
//     event.preventDefault;
//     $("textarea").val("");
//     localStorage.clear();
//   });
