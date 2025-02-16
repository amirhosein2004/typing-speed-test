const theTimer = document.querySelector(".timer");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const testWrapper = document.querySelector(".test-wrapper");
const resetButton = document.querySelector("#reset");

let timer = [0, 0, 0, 0];
let timerRunning = false;
let interval;

function leadingZero(time) {
  return time <= 9 ? "0" + time : time;
}

function runTimer() {
  const currentTime = `${leadingZero(timer[0])}:${leadingZero(timer[1])}:${leadingZero(timer[2])}`;
  theTimer.innerHTML = currentTime;
  
  timer[3]++;
  timer[0] = Math.floor(timer[3] / 100 / 60);
  timer[1] = Math.floor(timer[3] / 100) - (timer[0] * 60);
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

function spellCheck() {
  const textEntered = testArea.value;
  const originTextMatch = originText.substring(0, textEntered.length);

  if (textEntered === originText) {
    testWrapper.style.borderColor = "green";
    clearInterval(interval);
  } else {
    testWrapper.style.borderColor = textEntered === originTextMatch ? "yellow" : "red";
  }
}

function reset() {
  clearInterval(interval);
  interval = null;
  timer = [0, 0, 0, 0];
  timerRunning = false;
  
  testArea.value = "";
  theTimer.innerHTML = "00:00:00";
  testWrapper.style.borderColor = "grey";
}

function start() {
  if (testArea.value.length === 0 && !timerRunning) {
    timerRunning = true;
    interval = setInterval(runTimer, 10);
  }
}

testArea.addEventListener("keypress", start);
testArea.addEventListener("keyup", spellCheck);
resetButton.addEventListener("click", reset);
