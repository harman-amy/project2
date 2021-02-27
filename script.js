const weatherApp = {};

weatherApp.apiUrl = "https://api.openweathermap.org/data/2.5/weather";
weatherApp.apiKey = "75bca0532ad0bc22fa4ca7f257f8dbfe";

weatherApp.getApiInfo = function (userChoice, firstPageLoad) {
  const url = new URL(weatherApp.apiUrl);
  url.search = new URLSearchParams({
    appid: weatherApp.apiKey,
    q: userChoice,
  })

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      weatherApp.updateBackground(jsonResponse);
      weatherApp.displayApiInfo(jsonResponse, firstPageLoad);
    })
    .catch(function (error) {
      const errorMessage = document.querySelector('.error-message');
      errorMessage.style.display = "block";
      errorMessage.classList.add('fade-in-2');
    })
}

weatherApp.updateBackground = function (jsonDataIf) {
  const bodyElement = document.querySelector('body');

  if (jsonDataIf.weather[0].main == "Clear") {
    bodyElement.setAttribute('class', 'clear');
  } else if (jsonDataIf.weather[0].main == "Clouds") {
    bodyElement.setAttribute('class', 'cloudy');
  } else if (jsonDataIf.weather[0].main == "Drizzle") {
    bodyElement.setAttribute('class', 'drizzle');
  } else if (jsonDataIf.weather[0].main == "Rain") {
    bodyElement.setAttribute('class', 'drizzle');
  } else if (jsonDataIf.weather[0].main == "Snow") {
    bodyElement.setAttribute('class', 'snow');
  } else if (jsonDataIf.weather[0].main == "Fog" || "Mist" || "Smoke" || "Haze") {
    bodyElement.setAttribute('class', 'mist');
  } else if (jsonDataIf.weather[0].main == "Thunderstorm") {
    bodyElement.setAttribute('class', 'thunderstorm');
  }
}

weatherApp.displayApiInfo = function (jsonData, firstPageLoad) {
  const flexDiv = document.querySelector('.flex-container');
  if (!firstPageLoad) {
    flexDiv.classList.add('fade-in');
  };

  const weatherDiv = document.querySelector('.weather');
  weatherDiv.innerHTML = "";

  const errorMessage = document.querySelector('.error-message');
  errorMessage.style.display = "none";

  const h1Element = document.createElement('h1');
  h1Element.textContent = `${jsonData.name}, ${jsonData.sys.country}`;
  weatherDiv.appendChild(h1Element);

  const weatherDescription = document.createElement('p');
  weatherDescription.textContent = jsonData.weather[0].description;
  weatherDescription.setAttribute('class', 'capitalize')
  weatherDiv.appendChild(weatherDescription);

  const tempIcons = document.querySelector('.temperature');
  tempIcons.innerHTML = "";

  const currentTemp = document.createElement('p');
  currentTemp.textContent = `${Math.round(jsonData.main.temp - 273.15)}°C`;
  currentTemp.setAttribute('class', 'temperature-font');
  tempIcons.appendChild(currentTemp);

  const conditionsDiv = document.querySelector('.weather-conditions')
  conditionsDiv.innerHTML = "";

  const feelsTemp = document.createElement('p');
  feelsTemp.textContent = `Feels like: ${Math.round(jsonData.main.feels_like - 273.15)} °C`;
  conditionsDiv.appendChild(feelsTemp);

  const humidity = document.createElement('p');
  humidity.textContent = `Humidity: ${jsonData.main.humidity}%`;
  conditionsDiv.appendChild(humidity);

  const wind = document.createElement('p');
  wind.textContent = `Wind: ${jsonData.wind.speed}km/h`;
  conditionsDiv.appendChild(wind);
}

weatherApp.formElement = document.querySelector('form');
weatherApp.formElement.addEventListener('submit', function (event) {
  event.preventDefault();

  const inputElement = document.querySelector('input');

  weatherApp.getApiInfo(inputElement.value, firstPageLoad = false);

  inputElement.value = "";

  const flexDiv = document.querySelector('.flex-container');
  flexDiv.classList.remove('fade-in');
})

weatherApp.init = function () {
  const firstPageLoad = true;
  weatherApp.getApiInfo("toronto", firstPageLoad);
}

weatherApp.init();