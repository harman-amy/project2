/// creating an app object
const weatherApp = {};

//save relevant API information
weatherApp.apiUrl = "https://api.openweathermap.org/data/2.5/weather";
weatherApp.apiKey = "75bca0532ad0bc22fa4ca7f257f8dbfe";

//create a method (AKA function on the app object) which requests information from the API
//logs it to the console
weatherApp.getApiInfo = function (userChoice, firstPageLoad) {
  // use the URL constructor to specify the parameters we wish to inculde in our API endpoint (aka in the request we are making in the API.)
  const url = new URL(weatherApp.apiUrl);
  url.search = new URLSearchParams({
    appid: weatherApp.apiKey,
    q: userChoice,
  })

  // console.log(url);

  //using the fetch API to make a request to the Unsplash API photos endpoint
  // pass in new URL featuring params provided by the URL search params constructor.
  fetch(url)
    .then(function (response) {
      // console.log("hello");
      // get data from the url. To do that, we will add a parameter "RESPONSE" which will define the data from url.

      // console.log(response);
      // so the data we get back from url is response OBJECT but is not exactly contains the information we wanrs, so we will parse or extract data into JSON form.

      // parse this response into JSON
      return response.json();
      // the above method lives within fetch request that will turn the data into JSON file.

      // return JSON response so that it can be used in the next function
    })
    .then(function (jsonResponse) {
      // jsonResponse will represent the data from JSON file
      console.log(jsonResponse);
      // after we get back data in JSON file, then do the following.

      // display the data in this method or call the displayApiinfo() method within this function after its completed.
      // because we need info from api(jsonResponse) from this method(getApiInfo) for method(displayApiInfo).


      weatherApp.updateBackground(jsonResponse);

      weatherApp.displayApiInfo(jsonResponse, firstPageLoad);

      // errorMessage.style.display = "none";


    })
    .catch(function (error) {
      const errorMessage = document.querySelector('.error-message');
      errorMessage.style.display = "block";
    })
}

// function for updating background images based on weather conditions 
weatherApp.updateBackground = function (jsonDataIf) {

  const bodyElement = document.querySelector('body');

  if (jsonDataIf.weather[0].main == "Clear") {
    bodyElement.setAttribute('class', 'clear');
  } else if (jsonDataIf.weather[0].main == "Clouds") {
    bodyElement.setAttribute('class', 'cloudy');
  } else if (jsonDataIf.weather[0].main == "Drizzle") {
    bodyElement.setAttribute('class', 'drizzle');
  } else if (jsonDataIf.weather[0].main == "Rain") {
    bodyElement.setAttribute('class', 'rain');
  } else if (jsonDataIf.weather[0].main == "Snow") {
    bodyElement.setAttribute('class', 'snow');
  } else if (jsonDataIf.weather[0].main == "Fog" || "Mist") {
    bodyElement.setAttribute('class', 'mist');
  } else if (jsonDataIf.weather[0].main == "Smoke" || "Haze") {
    bodyElement.setAttribute('class', 'haze');
  } else if (jsonDataIf.weather[0].main == "Thunderstorm") {
    bodyElement.setAttribute('class', 'thunderstorm');
  } 
}


// Define a method to display jsonResponse from Api.
weatherApp.displayApiInfo = function (jsonData, firstPageLoad) {
  // jsonData is represnting data from jsonResponse as we will end up calling this method within getApiInfo method because otehrwise we wont have access to that information as its locally scoped in getApiInfo and we will end up calling this method within getApiInfo.  

  // query the document and find the (div class = "display-weather") where we will contain the dynamic content.
  const weatherDiv = document.querySelector('.weather');

  if (!firstPageLoad) {
    // ! defines is not
    weatherDiv.classList.add('scale');
  };
  // console.log(divElement);

  weatherDiv.innerHTML = "";
  // weatherDiv.setAttribute('class', 'scale')

  const errorMessage = document.querySelector('.error-message');
  errorMessage.style.display = "none";

  // create a 'h1' tag to contain the city name.
  const h1Element = document.createElement('h1');
  h1Element.textContent = `${jsonData.name}, ${jsonData.sys.country}`;
  // console.log(h1Element);
  weatherDiv.appendChild(h1Element);

  const weatherDescription = document.createElement('p');
  weatherDescription.textContent = jsonData.weather[0].description;
  weatherDescription.setAttribute('class', 'capitalize');
  // weatherDescription.setAttribute('class', 'capitalize scale');

  weatherDiv.appendChild(weatherDescription);

  // query the document and find the div.temp-icoons to hold temperature information & weather icon together(flex it to display side by side).
  const tempIcons = document.querySelector('.temp-icon');
  tempIcons.innerHTML = "";

  const currentTemp = document.createElement('p');
  currentTemp.textContent = `${Math.round(jsonData.main.temp - 273.15)}°C`;
  currentTemp.setAttribute('class', 'temperature');
  tempIcons.appendChild(currentTemp);

  // create <p> to hold weather icon
  const iconUrl = document.createElement('p');
  iconUrl.innerHTML = `<img src= http://openweathermap.org/img/w/${jsonData.weather[0].icon}.png>`;
  tempIcons.appendChild(iconUrl);


  // query the document and find the (div class = "display-weather-conditions") where we will contain the weather-condtions content.
  const conditionsDiv = document.querySelector('.weather-conditions')
  conditionsDiv.innerHTML = "";
  // to empty it after the user inputs a new city.

  // create h3 tags for information like temp feels and humidity and append it to the condtions div.
  const feelsTemp = document.createElement('p');
  feelsTemp.textContent = `Feels like: ${Math.round(jsonData.main.feels_like - 273.15)} °C`;
  conditionsDiv.appendChild(feelsTemp);

  const humidity = document.createElement('p');
  humidity.textContent = `Humidity: ${jsonData.main.humidity}%`;
  conditionsDiv.appendChild(humidity);

  const wind = document.createElement('p');
  wind.textContent = `Wind: ${jsonData.wind.speed}km/h`;
  conditionsDiv.appendChild(wind);

  // Once we create elements, we need to append the elements to the div class = "display-weather"
}

// event handler on form to get userChoice

weatherApp.formElement = document.querySelector('form');
weatherApp.formElement.addEventListener('submit', function (event) {
  event.preventDefault();
  // prevent page from refreshing

  //2. to get the user input from the form
  const inputElement = document.querySelector('input');
  console.log(inputElement);
  // capturing the value from the input on submit.

  weatherApp.getApiInfo(inputElement.value, firstPageLoad = false);


  //clear the input after the event is saved & acted upon. 
  inputElement.value = "";

  const weatherDiv = document.querySelector('.weather');

  weatherDiv.classList.remove('scale');
})

weatherApp.init = function () {
  let firstPageLoad = true;
  weatherApp.getApiInfo("toronto", firstPageLoad);
  // we are running this function because we need Toronto data on default load screen.
}

weatherApp.init();