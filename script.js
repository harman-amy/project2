// creating an app object
const weatherApp = {};

//save relevant API information
weatherApp.apiUrl = "https://api.openweathermap.org/data/2.5/weather";
weatherApp.apiKey = "75bca0532ad0bc22fa4ca7f257f8dbfe";

weatherApp.getApiInfo = function (userChoice) {
  // use the URL constructor to specify the parameters we wish to inculde in our API endpoint (aka in the request we are making in the API.)
  const url = new URL(weatherApp.apiUrl);
  url.search = new URLSearchParams({
    appid: weatherApp.apiKey,
    q: userChoice
  })
  // console.log(url);
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

    // after we get back data in JSON file, then do the following.
    .then(function (jsonResponse) {
      // jsonResponse will represent the data from JSON file
      console.log(jsonResponse);

      // display the data in this method or call the displayApiinfo() method within this function after its completed.
      // because we need info from api(jsonResponse) from this method(getApiInfo) for method(displayApiInfo).

      weatherApp.displayApiInfo(jsonResponse);
      // weatherApp.displayApiInfo(jsonResponse);

    })
}

// Define a method to display jsonResponse from Api.
weatherApp.displayApiInfo = function (jsonData) {
  // jsonData is represnting data from jsonResponse as we will end up calling this method within getApiInfo method because otehrwise we wont have access to that information as its locally scoped in getApiInfo and we will end up calling this method within getApiInfo.  

  // query the document and find the (div class = "display-weather") where we will contain the dynamic content.
  const divElement = document.querySelector('.display-weather');
  // console.log(divElement);
  divElement.innerHTML = "";

  // create a 'h1' tag to contain the city name.
  const h1Element = document.createElement('h1');
  h1Element.textContent = `${jsonData.name}, ${jsonData.sys.country}`;
  // console.log(h1Element);
  divElement.appendChild(h1Element);

  // create h2 tag to hold temperature information
  const currentTemp = document.createElement('h2');
  currentTemp.textContent = `${Math.round(jsonData.main.temp - 273.15)} °C`;
  divElement.appendChild(currentTemp);

  // create h3 tags for information like temp feels and humidity.

  const feelsTemp = document.createElement('h3');
  feelsTemp.textContent = `Feels like: ${Math.round(jsonData.main.feels_like - 273.15)} °C`;
  divElement.appendChild(feelsTemp);

  const humidity = document.createElement('h3');
  humidity.textContent = `Humidity: ${jsonData.main.humidity}%`;
  divElement.appendChild(humidity);

  const weatherDescription = document.createElement('h4');
  weatherDescription.textContent = jsonData.weather[0].description;
  divElement.appendChild(weatherDescription);

  const paragraph = document.createElement('p');
  // Once we create elements, we need to append the elements to the div class = "display-weather" 

}

// event handler on form
const formElement = document.querySelector('form');
formElement.addEventListener('submit', function (event) {
  event.preventDefault();
  // prevent page from refreshing

  //2. to get the user input from the form
  const inputElement = document.querySelector('input');
  // console.log(inputElement.value)
  // capturing the value from the input on submit.

  //3. storing input into a variable
  const cityName = inputElement.value;
  // console.log(cityName)

  //create a method (AKA function on the app object) which requests information from the API
  //logs it to the console
  weatherApp.getApiInfo(inputElement.value)
  inputElement.value = "";
})

weatherApp.init = function () {
  weatherApp.getApiInfo('toronto')
}
weatherApp.init();



      