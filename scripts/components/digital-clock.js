// *** Digital Clock settings ***

const displayDigitalClock = (cellNum) => {
  let digitalClockElm = document.getElementById(`div${cellNum}`);
  digitalClockElm.innerHTML = "";

  // Add digital clock style
  digitalClockElm.classList.add("digital-clock");

  // Start the clock
  startTime(digitalClockElm); 
}


const bnm = (cellToUpdate) => {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);
  cellToUpdate.innerHTML = `${h}:${m}:${s}`;
  const t = setTimeout(startTime, 500, cellToUpdate);
}


const checkTime = (i) => {
  // add zero in front of numbers < 10
  if (i < 10) {
    i = `0${i}`;
  }
  
  return i;
}

export default displayDigitalClock;