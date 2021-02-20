console.log("checking");

const weatherApp = {};

weatherApp.apiUrl = "https://api.openweathermap.org/data/2.5/weather";
weatherApp.apiKey = "75bca0532ad0bc22fa4ca7f257f8dbfe";

weatherApp.getCities = function () {
    const url = new URL(weatherApp.apiUrl);
    url.search = new URLSearchParams({
        // pass in our API key as a parameter
        q: userChoice,
        appid: weatherApp.apiKey
    })
    console.log(url);

    fetch(url)
        .then(function (response) {
            // console.log(response);
            // parse this response into JSON
            return response.json();
            // return JSON response so that it can be used in the next function
        })
        // parse the JSON promise resposne and log out readable data (aka data in JSON format)
        .then(function (jsonResponse) {
            console.log(jsonResponse);
          const formElement = document.querySelector('form');
          formElement.addEventListener('submit', function (event) {
            event.preventDefault();
            // inputElement.value = "";

            // work with the data from the API

            const displayWeather = document.querySelector('.weather-data');
            displayWeather.textContent = `Weather in ${userChoice}`;
            // console.log()

            const displayTemp = document.querySelector('.weather-data');
            const paraTemp = document.createElement('p');
            paraTemp.textContent = `Temperature:${jsonResponse.main.temp}`;
            document.querySelector('.weather-data').appendChild(paraTemp);

            const feelsTemp = document.createElement('p');
            feelsTemp.textContent = `Feels like:${jsonResponse.main.feels_like}`;
            document.querySelector('.weather-data').appendChild(feelsTemp);

            const minTemp = document.createElement('p');
            minTemp.textContent = `Minimum Temperature:${jsonResponse.main.temp_min}`;
            document.querySelector('.weather-data').appendChild(minTemp);

            const maxTemp = document.createElement('p');
            maxTemp.textContent = `Maximum Temperature:${jsonResponse.main.temp_max}`;
            document.querySelector('.weather-data').appendChild(maxTemp);

            const paraHumidity = document.createElement('p');
            paraHumidity.textContent = `Humidity:${jsonResponse.main.humidity}`;
            document.querySelector('.weather-data').appendChild(paraHumidity);
            
            const weatherIcon = document.createElement('i');
            weatherIcon.textContent = jsonResponse.weather[0].icon;
            document.querySelector('.weather-data').appendChild(weatherIcon);

            const weatherDescription = document.createElement('p');
            weatherDescription.textContent = jsonResponse.weather[0].description;
            document.querySelector('.weather-data').appendChild(weatherDescription);
          })
        })
        
}

const inputElement = document.querySelector('input');
const userChoice = inputElement.value;
// to store the city chosen by user.

// const buttonElement = document.querySelector('button');


// on submit,  weather info - temp/humidity icon, description 


//create an initialization method
weatherApp.init = function () {
    //calling the method which makes the request to the API
    weatherApp.getCities();
}
//call the init method to kickstart our app
weatherApp.init();
