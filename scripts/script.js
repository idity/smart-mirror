import loadWiki from '/scripts/components/wiki.js';
import displayDigitalClock from '/scripts/components/digital-clock.js';
import { displayAnalogClock, resizeAnalogClock, analogClockCellsArray } from '/scripts/components/analog-clock.js';
import { loadWeather, loadWeatherImage, resizeWeatherImage } from '/scripts/components/weather.js';

// *** Build the layout ***

const buildLayout = (url, rows, cols) => {
  getGridDetails(url, rows, cols);
}


const getGridDetails = (url, rows, cols) => {

  if (isNaN(rows) || rows > 4 || rows < 1) {
    throw new Error("rows value must be a number between 1 to 4");
  }

  if (isNaN(cols) || cols > 4 || cols < 1) {
    throw new Error("Cols value must be a number between 1 to 4");
  }

  createNewDivs(rows, cols);
}


const createNewDivs = (rows, cols) => {
  let mainContainer = document.getElementById("container");
  // Create the divs as the user requested
  for (let i=0; i<rows*cols; i++) {
    
    // Create the div
    let item = document.createElement("div");
    item.setAttribute("id", `div${i+1}`);

    // Add a style
    item.classList.add("cell");

    // Add the div to the container div
    mainContainer.appendChild(item);
  }

  createGrid(rows, cols, mainContainer);
}

const createGrid = (rows, cols, mainContainer) => {
  // Create the grid columns
  mainContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  // Create the grid rows
  mainContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
}

// *** Load the cells ***

const loadCells = (url, rows, cols) => {
  
  for (let i=1; i<=rows*cols; i++) {
    const value = getCellValue(i, url);

    switch (value) {
      case ("digclock"):
        displayDigitalClock(i);
        break;
      case ("anclock"):
        analogClockCellsArray.push(i);
        displayAnalogClock(i);
        break;
      case ("wiki"):
        loadWiki(i);
        break;
      case ("weather"):
        loadWeather(i);
        break;
      default:
        // Do nothing
    }
  }
}


const getCellValue = (cellNum, url) => {
  return url.searchParams.get(cellNum);
}


// Browser resize

window.addEventListener("resize", (event) => {
  // Resizes the analog clock 
  resizeAnalogClock();
  resizeWeatherImage();
});


// *** Main ***

const main = () => {
  const url = new URL(window.location.href);
  const rows = url.searchParams.get("rows");
  const cols = url.searchParams.get("cols");

  buildLayout(url, rows, cols);
  loadCells(url, rows, cols);

  // Refresh the page every hour
  setInterval(loadCells, 1000 * 60 * 60);
}

main();