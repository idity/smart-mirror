import { getImgSize } from './scripts/globals.js';
import WEATHER_IMAGES from './scripts/CONSTS.js';

// *** Weather ***
export const weatherImageInfoArray = [];

export const loadWeather = (cellNum) => {
  let weatherContainer = document.getElementById(`div${cellNum}`);
  weatherContainer.innerHTML = "";

  // Start loading the weather container
  getWeather(weatherContainer);
}

const farenheitToCelsius = (k) => {
  return Math.round((k - 32) * 0.5556 );
}

const humidityPercentage = (h) => {
  return Math.round(h * 100);
}

const degreesToDirection = (degrees) => {
    const range = 360/16;
    const low = 360 - range/2;
    const high = (low + range) % 360;
    const angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    for (i in angles) {

        if(degrees>= low && degrees < high)
            return angles[i];

        low = (low + range) % 360;
        high = (high + range) % 360;
    }
}

const knotsToKilometres = (knot) => {
  return Math.round( knot * 1.852);
}


// Get the location and then continue to find the weather forecast accordingly
const getWeather = (weatherContainer) => {
  // debugger;
  if(navigator.geolocation){
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        showWeather(lat, long, weatherContainer);
      })
    } catch (err) {
      console.log("getWeather function", err);
      weatherContainer.appendChild(document.createTextNode(err));
    }
  } else {
      window.alert("Could not get location");
  }
}
 
const showWeather = (lat, long, weatherContainer) => {
  // Build the url to get the forecast
  const urlProxy = 'https://cors-anywhere.herokuapp.com/';
  const urlRemoteSite = `https://api.darksky.net/forecast/f672ff13193bfcc40427a678ebfdbc71/${lat},${long}?format=jsonp`; // +`&callback=displayWeather`;
  const urlToLoad = `${urlProxy}${urlRemoteSite}`;

  fetch(urlToLoad)
    .then((response) => {
      return response.text();
    })
    .then((body) => {
      // Get the json weather object
      let jsonObj = JSON.parse(body);
      jsonObj = jsonObj.currently;
      let objTemprature = jsonObj.temperature;
      let objSummary = jsonObj.summary;
      let objHumidity = jsonObj.humidity;
      
      fillWeatherContainer(jsonObj, weatherContainer);
    })
    .catch(err =>{
      console.log("showWeather", err);
    });
}

const fillWeatherContainer = (jsonObj, weatherContainer) => {
  // Set the summary icon
  let summaryIcon = document.createElement("img");
  weatherContainer.appendChild(summaryIcon);
  
  summaryIcon.src = WEATHER_IMAGES[jsonObj.icon];
  //summaryIcon.classList.add("weather-img");

  let imageInfo = new WeatherImageInfo(summaryIcon, weatherContainer);
  weatherImageInfoArray.push(imageInfo); 
  summaryIcon.addEventListener("load", () => { 
      loadWeatherImage(imageInfo.summaryIcon, imageInfo.weatherContainer);
  });

  // Set forecast details div
  let forecastDetailsDiv = document.createElement("div");
  weatherContainer.appendChild(forecastDetailsDiv);
  weatherContainer.classList.add("weather-cell");

  // Set the temperatures
  let temperatures = document.createElement("h2");
  forecastDetailsDiv.appendChild(temperatures);
  let temperaturesText = `${farenheitToCelsius(jsonObj.temperature)} C / ${jsonObj.temperature} F`;
  temperatures.appendChild(document.createTextNode(temperaturesText));

  // Set the summary of the weather forecast
  let summary = document.createElement("h2");
  forecastDetailsDiv.appendChild(summary);
  summary.appendChild(document.createTextNode(jsonObj.summary));
}

export const loadWeatherImage = (summaryIcon, weatherContainer) => {
  // Wait for the image to load and then set its size
  let size = getImgSize(0.6, weatherContainer);
  summaryIcon.style.width = `${size}px`;
  summaryIcon.style.height = `${size}px`;
}

export const resizeWeatherImage = () => {
  // Runs over the array of weather cells to draw their image again
  for (let value of weatherImageInfoArray) {
    loadWeatherImage(value.summaryIcon, value.weatherContainer);
  }
}

class WeatherImageInfo {
  constructor(summaryIcon, weatherContainer) {
    this.summaryIcon = summaryIcon;
    this.weatherContainer = weatherContainer;
  }
}