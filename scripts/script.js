// Global variables initialization
let container = document.getElementById("container");

const url_string = window.location.href;
const url = new URL(url_string);

let rows = 1;
let cols = 1;


// *** Build the layout ***

const buildLayout = () => {
  getGridDetails();
  createNewDivs(); 
  createGrid();
}


const getGridDetails = () => {
  rows = url.searchParams.get("rows");
  
  cols = url.searchParams.get("cols");

  if (isNaN(rows) || rows > 4 || rows < 1) {
    throw new Error("rows value must be a number between 1 to 4");
  }

  if (isNaN(cols) || cols > 4 || cols < 1) {
    throw new Error("Cols value must be a number between 1 to 4");
  }
}


const createNewDivs = () => {
  // Create the divs as the user requested
  for (let i=0; i<rows*cols; i++) {
    
    // Create the div
    let item = document.createElement("div");
    item.setAttribute("id", "div" + (i+1));

    // Add a style
    item.classList.add("cell");

    // Add text to the div
    // let text = document.createTextNode(`This is div #${i+1}`);      // Create a text node
    // item.appendChild(text);

    // Add the div to the container div
    container.appendChild(item);

    // console.log("div" + (i+1) + " created");
  }
}

const createGrid = () => {
  // Create the grid columns
  container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  // Create the grid rows
  container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
}


const getCell = (cellName) => {
  let cell = url.searchParams.get(cellName);

  // Cell number validation
  if (cell===null || cell === NaN || cell < 1 || cell > rows*cols) {
      cell = 0;
  } 
  
  return cell;
}


// *** Digital Clock settings ***

const displayDigitalClock = () => {
  // Get the requested cell to show the clock in
  const cellNum = getCell("digclock");

  if (cellNum !== 0) {
    let digitalClockElm = document.getElementById("div" + cellNum);

    // Add digital clock style
    digitalClockElm.classList.add("digital-clock");

    // Start the clock
    startTime(digitalClockElm);
  }
}


const startTime = (cellToUpdate) => {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);
  cellToUpdate.innerHTML = h + ":" + m + ":" + s;
  const t = setTimeout(startTime, 500, cellToUpdate);
}


const checkTime = (i) => {
  // add zero in front of numbers < 10
  if (i < 10) {
    i = "0" + i;
  }
  
  return i;
}


// *** Analog Clock settings ***

const displayAnalogClock = () => {
  // Get the requested cell to show the clock in
  const cellNum = getCell("anclock");
  
  if (cellNum !== 0) {
    // Set the div of the clock
    let analogClockParent = document.getElementById("div" + cellNum);

    // Create the clock
    createClockCanvas(analogClockParent);
  }
}

const createClockCanvas = (parent) => {
  // Create the div
  let canvas = document.createElement("canvas");
  canvas.setAttribute("id", "clock-canvas");

  // Adjust the canvas size to the size of its parent div
  canvas.width = parent.offsetHeight;
  canvas.height = parent.offsetHeight;

  // Add the clock div to the parent div
  parent.appendChild(canvas);

  let ctx = canvas.getContext("2d");
  
  let radius = canvas.height / 2;
  ctx.translate(radius, radius);
  radius = radius * 0.90;

  // Draw the clock
  setInterval(drawClock, 1000, [ctx, radius]);
}

const drawClock = (params) => {
  ctx = params[0];
  radius = params[1];
  
  ctx.arc(0, 0, radius, 0 , 2 * Math.PI);
  ctx.fill();

  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

const drawFace = (ctx, radius) => {
  let grad;

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'black'; // The background of the clock
  ctx.fill();

  // The border of the clock
  ctx.strokeStyle = "white"; // The color of the border of the clock
  ctx.lineWidth = radius*0.05; // The width of the border of the clock
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

const drawNumbers = (ctx, radius) => {
  let ang;
  let num;
  ctx.font = "bold " + radius * 0.2 + "px Merriweather serif";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillStyle = "white";
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

const drawTime = (ctx, radius) => {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  
  //hour
  hour = hour%12;
  hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
  drawHand(ctx, hour, radius*0.5, radius*0.06);
  
  //minute
  minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
  drawHand(ctx, minute, radius*0.8, radius*0.06);
  
  // second
  second = (second*Math.PI/30);
  drawHand(ctx, second, radius*0.8, radius*0.02);
}

const drawHand = (ctx, pos, length, width) => {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0,0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}


// *** Wikipedia ***
// /wiki/Special:Random
const loadWiki = () => {
  // Get the requested cell to show the clock in
  const cellNum = getCell("wiki");
  
  if (cellNum !== 0) {
    // Set the wiki div
    let wikiContainer = document.getElementById("div" + cellNum);
    wikiContainer.classList.add("wiki");

    // Set the title of the wiki article
    let wikiTitle = document.createElement("h2");
    wikiContainer.appendChild(wikiTitle);
    wikiTitle.appendChild(document.createTextNode(""));

    // Set the content of the wiki article
    let wikiPage = document.createElement("p");
    wikiContainer.appendChild(wikiPage);

    let response;
    let urlToLoad = "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&exintro&explaintext&redirects=1&generator=random&grnnamespace=0&prop=extracts";
    //let urlToLoad = "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&generator=random&grnnamespace=0&prop=revisions&rvprop=content&rvsection=0&rvslots=main";

    fetch(urlToLoad)
    .then(function(response) {
      return response.text();
    })
    .then(function(body) {
      let jsonObj = JSON.parse(body);
      jsonObj = jsonObj.query.pages;
      let objWiki = jsonObj[Object.keys(jsonObj)[0]];
      let title = objWiki.title;
      let extract = objWiki.extract;
      
      wikiTitle.appendChild(document.createTextNode(title));
      wikiPage.appendChild(document.createTextNode(extract));
    });
  }
}


// *** Weather ***

const loadWeather = () => {

  // Get the requested cell to show the clock in
  const cellNum = getCell("weather");

  if (cellNum !== 0) {
    let weatherContainer = document.getElementById("div" + cellNum);

    // Start loading the weather container
    getWeather(weatherContainer);
  }
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

const weatherImages = {
  "clear-day": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Sun_icon.svg/252px-Sun_icon.svg.png",
  "clear-night": "http://www.clker.com/cliparts/f/S/2/p/7/u/gold-matte-moon.svg",
  "rain": "https://cdn3.iconfinder.com/data/icons/weather-16/256/Rainy_Day-512.png",
  "snow": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Nuvola_weather_snow.svg/1000px-Nuvola_weather_snow.svg.png",
  "sleet": "http://www.clker.com/cliparts/f/6/7/4/1206565674431593790Anonymous_simple_weather_symbols_10.svg.hi.png",
  "wind": "http://www.haotu.net/up/4233/128/216-wind.png",
  "fog": "http://www.iconninja.com/files/81/344/943/fog-cloud-hiding-the-sun-weather-interface-symbol-icon.svg",
  "cloudy": "http://camera.thietbianninh.com/images/icon-2.png",
  "partly-cloudy-day": "http://meteo.cw/images_www/weather_icons1/weather_icon_03.png",
  "partly-cloudy-night": "http://icon-park.com/imagefiles/simple_weather_icons_cloudy_night.png",
  "hail": "http://icons.iconarchive.com/icons/icons8/ios7/256/Weather-Hail-icon.png",
  "thunderstorm": "http://findicons.com/files/icons/2613/android_weather_extended/480/thunderstorms.png",
  "tornado": "http://hddfhm.com/images/clipart-of-a-tornado-11.png"
}

// Get the location and then continue to find the weather forecast accordingly
const getWeather = (weatherContainer) => {
  // debugger;
  if(navigator.geolocation){
    try {
      navigator.geolocation.getCurrentPosition(function(position){
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
  const urlProxy = "https://cors-anywhere.herokuapp.com/";
  const urlRemoteSite = `https://api.darksky.net/forecast/f672ff13193bfcc40427a678ebfdbc71/${lat},${long}` + 
                    `?format=jsonp`; // +`&callback=displayWeather`;
  const urlToLoad = urlProxy + urlRemoteSite;

  fetch(urlToLoad)
    .then(function(response) {
      return response.text();
    })
    .then(function(body) {
      // Get the json weather object
      let jsonObj = JSON.parse(body);
      jsonObj = jsonObj.currently;
      let objTemprature = jsonObj.temperature;
      let objSummary = jsonObj.summary;
      let objHumidity = jsonObj.humidity;
      
      fillWeatherContainer(jsonObj, weatherContainer);
    });
}

const fillWeatherContainer = (jsonObj, weatherContainer) => {
  // Set the summary icon
  let summaryIcon = document.createElement("img");
  weatherContainer.appendChild(summaryIcon);
  summaryIcon.src = weatherImages[jsonObj.icon];
  summaryIcon.classList.add("weather-img");

  // Set forecast details div
  let forecastDetailsDiv = document.createElement("div");
  weatherContainer.appendChild(forecastDetailsDiv);
  weatherContainer.classList.add("weather-cell");

  // Set the temperatures
  let temperatures = document.createElement("h2");
  forecastDetailsDiv.appendChild(temperatures);
  let temperaturesText = farenheitToCelsius(jsonObj.temperature) + " C" + "  /  " + 
                          jsonObj.temperature + " F";
  temperatures.appendChild(document.createTextNode(temperaturesText));

  // Set the summary of the weather forecast
  let summary = document.createElement("h2");
  forecastDetailsDiv.appendChild(summary);
  summary.appendChild(document.createTextNode(jsonObj.summary));
}


// *** Main ***

buildLayout();
displayDigitalClock();
displayAnalogClock();
loadWiki();
loadWeather();