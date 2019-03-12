import { getImgSize } from '/scripts/globals.js';

// *** Analog Clock settings ***
export const analogClockCellsArray = [];

export const displayAnalogClock = (cellNum) => {
  // Set the div of the clock
  let analogClockParent = document.getElementById(`div${cellNum}`);

  // Initialize the div before drwing in it
  analogClockParent.innerHTML = "";

  // Create the clock
  createClockCanvas(analogClockParent);
}

const createClockCanvas = (parent) => {
  // Create the div
  let canvas = document.createElement("canvas");
  canvas.setAttribute("id", "clock-canvas");
  
  // Adjust the canvas size to the size of its parent div
  let size = getImgSize(1, parent);
  canvas.width = size;
  canvas.height = size;

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
  let ctx = params[0];
  let radius = params[1];
  
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
  ctx.font = `bold ${radius * 0.2}px Merriweather serif`;
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

export const resizeAnalogClock = () => {
  // Runs over the array of analog clock cells to draw them again
  for (let value of analogClockCellsArray) {
    displayAnalogClock(value);
  }
}