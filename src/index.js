const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
// TODO: Add the missing query selectors:
const score = document.querySelector("#score"); // Use querySelector() to get the score element
const timerDisplay = document.querySelector("#timer"); // use querySelector() to get the timer element.

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";


function randomInteger(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setDelay(difficulty) {
if (difficulty === "easy") {
  return 1500;
} else if (difficulty === "normal") {
  return 1000;
} else { 
  return randomInteger(600, 1200);
}
}
  
function chooseHole(holes) {
  const index = randomInteger(0, 8);
  const hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes);
      }
lastHole = hole;
return hole;
    }
     
function gameOver() {
 if (time > 0) {
  timeoutId = showUp();
  return timeoutId;
 } else {
 gameStopped = stopGame();
 return gameStopped;
}
}
function showUp() {
  let delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

function showAndHide(hole, delay){
  toggleVisibility(hole);
  
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);
    
    gameOver();
  }, delay ); 
  return timeoutID;
}

function toggleVisibility(hole){
hole.classList.toggle("show");  
  return hole;
}

function updateScore() {
  points +=1;
  score.textContent = points;
  return points;
}

function clearScore() {
points = 0;
score.textContent = points;
  return points;
}

/**
*
* Updates the control board with the timer if time > 0
*
*/
function updateTimer() {
  if (time > 0) {
		time -= 1;
		timerDisplay.textContent = time;
	}
	return time;
}
  

/**
*
* Starts the timer using setInterval. For each 1000ms (1 second)
* the updateTimer function get called. This function is already implemented
*
*/
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

function whack(event) {
  updateScore()
  return points;
}
function setEventListeners(){
  moles.forEach((moles) => moles.addEventListener("click", whack));
	return moles;
}

/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/
function setDuration(duration) {
  time = duration;
  return time;
}

/**
*
* This function is called when the game is stopped. It clears the
* timer using clearInterval. Returns "game stopped".
*
*/
function stopGame(){
  // stopAudio(song);  //optional
  clearInterval(timer);
  time = 15;
  return "game stopped";
}

/**
*
* This is the function that starts the game when the `startButton`
* is clicked.
*
*/
function startGame(){
  setDuration(time);
  showUp();
  clearScore();
  setEventListeners();
  startTimer();
  return "game started";
}

startButton.addEventListener("click", startGame);


// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
