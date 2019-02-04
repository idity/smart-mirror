"use strict";
// Global variables initialization
let container = document.getElementById("container");

const url_string = window.location.href;
const url = new URL(url_string);
const searchParams = new URLSearchParams(url.search)
let rows = 1;
let cols = 1;

// *** Build the layout ***

function buildLayout() {
  getGridDetails();
  createNewDivs(); 
  createGrid();
}


function getGridDetails() {
  rows = searchParams.get("rows");
  console.log("number of rows required:", rows);
  
  cols = searchParams.get("cols");
  console.log("number of cols required:", cols);

  if (isNaN(rows) || rows > 4 || rows < 1) {
    throw new Error("rows value must be a number between 1 to 4");
    // console.log("You must define rows with a number between 1 to 4");
  }

  if (isNaN(cols) || cols > 4 || cols < 1) {
    throw new Error("Cols value must be a number between 1 to 4");
    // console.log("You must define cols with a number between 1 to 4");
  }
}


function createNewDivs() {
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

    console.log("div" + (i+1) + " created");
  }
}

function createGrid() {
  // Create the grid columns
  container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  console.log("The value of gridTemplateColumns is: ", container.style.gridTemplateColumns);

  // Create the grid rows
  container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  console.log("The value of gridTemplateRows is: ", container.style.gridTemplateRows);
}


function getCell(cellName) {
  let cell = searchParams.get(cellName);
  console.log(`${cellName} cell is: ${cell}`);

  // Cell number validation
  if (cell===null || cell === NaN || cell < 1 || cell > rows*cols) {
      cell = 0;
  } 
  
  console.log(`${cellName} final cell is: ${cell}`);
  return cell;
}


// *** Digital Clock settings ***

function displayDigitalClock() {
  // Get the requested cell to show the clock in
  const cellNum = getCell("digclock");
  console.log(`cellNum in displayDigitalClock is: ${cellNum}`);

  if (cellNum !== 0) {
    let digitalClockElm = document.getElementById("div" + cellNum);

    // Add digital clock style
    digitalClockElm.classList.add("digital-clock");

    // Start the clock
    startTime(digitalClockElm);
  }
}


function startTime(cellToUpdate) {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  cellToUpdate.innerHTML = h + ":" + m + ":" + s;
  var t = setTimeout(startTime, 500, cellToUpdate);
}


function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}


// *** Analog Clock settings ***

function displayAnalogClock() {
  // Get the requested cell to show the clock in
  const cellNum = getCell("anclock");
  
  if (cellNum !== 0) {
    let analogClockParent = document.getElementById("div" + cellNum);

    // Add analog clock style
    analogClockParent.classList.add("analog-clock");

    // Create the clock
    createClockCanvas(analogClockParent);

    // Start the clock
    //startTime(digitalClockElm);
  }
}

function createClockCanvas(parent) {
  // Create the div
  let canvas = document.createElement("canvas");
  canvas.setAttribute("id", "clock-canvas");

  // Add text to the div
  // let text = document.createTextNode(`This is div #${i+1}`);      // Create a text node
  // item.appendChild(text);

  canvas.width = parent.offsetHeight;
  canvas.height = parent.offsetHeight;

  // Add the div to the container div
  parent.appendChild(canvas);

  var ctx = canvas.getContext("2d");
  var radius = canvas.height / 2;
  ctx.translate(radius, radius);
  radius = radius * 0.90;

  // Draw the clock
  setInterval(drawClock, 1000, [ctx, radius]);
}

function drawClock(params) {
  ctx = params[0];
  radius = params[1];
  
  ctx.arc(0, 0, radius, 0 , 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();

  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();

  grad = ctx.createRadialGradient(0, 0 ,radius * 0.95, 0, 0, radius * 1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}


function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = "bold " + radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  //hour
  hour = hour%12;
  hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
  drawHand(ctx, hour, radius*0.5, radius*0.07);
  //minute
  minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
  drawHand(ctx, minute, radius*0.8, radius*0.07);
  // second
  second = (second*Math.PI/30);
  drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0,0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

// *** 2 ***

function displayAnalogClock2() {
  // Get the requested cell to show the clock in
  const cellNum = getCell("anclock2");
  
  if (cellNum !== 0) {
    let analogClockParent = document.getElementById("div" + cellNum);

    // Add analog clock style
    //analogClockParent.classList.add("analog-clock");

    // Create the clock
    createClockCanvas2(analogClockParent);

    // Start the clock
    //startTime(digitalClockElm);
  }
}

function createClockCanvas2(parent) {
  // Create the div
  let canvas = document.createElement("canvas");
  canvas.setAttribute("id", "clock-canvas2");

  // Add text to the div
  // let text = document.createTextNode(`This is div #${i+1}`);      // Create a text node
  // item.appendChild(text);

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
  setInterval(drawClock2, 1000, [ctx, radius]);
}

function drawClock2(params) {
  let ctx = params[0];
  let radius = params[1];
  
  ctx.arc(0, 0, radius, 0 , 2 * Math.PI);
  //ctx.fillStyle = "red";
  ctx.fill();

  drawFace2(ctx, radius);
  drawNumbers2(ctx, radius);
  drawTime2(ctx, radius);
}

function drawFace2(ctx, radius) {
  let grad;

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'black'; // The background of the clock
  ctx.fill();

  // The border of the clock
  // grad = ctx.createRadialGradient(0, 0 ,radius * 0.95, 0, 0, radius * 1.05);
  // grad.addColorStop(0, '#333');
  // grad.addColorStop(0.5, 'white');
  // grad.addColorStop(1, '#333');
  // ctx.strokeStyle = grad;
  ctx.strokeStyle = "white"; // The color of the border of the clock
  ctx.lineWidth = radius*0.05; // The width of the border of the clock
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers2(ctx, radius) {
  var ang;
  var num;
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

function drawTime2(ctx, radius){
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  //hour
  hour = hour%12;
  hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
  drawHand2(ctx, hour, radius*0.5, radius*0.06);
  //minute
  minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
  drawHand2(ctx, minute, radius*0.8, radius*0.06);
  // second
  second = (second*Math.PI/30);
  drawHand2(ctx, second, radius*0.8, radius*0.02);
}

function drawHand2(ctx, pos, length, width) {
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
function loadWiki() {
  // Get the requested cell to show the clock in
  const cellNum = getCell("wiki");
  
  if (cellNum !== 0) {
    let wikiContainer = document.getElementById("div" + cellNum);
    wikiContainer.classList.add("wiki");

    let wikiTitle = document.createElement("h2");
    wikiContainer.appendChild(wikiTitle);
    wikiTitle.appendChild(document.createTextNode(""));

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


// *** Main ***

buildLayout();
displayDigitalClock();
displayAnalogClock();
displayAnalogClock2();
loadWiki();