const start = document.querySelector("#start");
const diceButton = document.querySelector("#diceButton");
const diceImageOne = document.querySelector("#diceImage1");
const diceImageTwo = document.querySelector("#diceImage2");
const randomDiceNumber = [1, 2, 3, 4, 5, 6];
const container1Div = document.querySelector("#container1");
const container2Div = document.querySelector("#container2");
const submitButton = document.getElementById("submitButton");
const remarkButton = document.getElementById("remarkButton");
const restartGameBtn = document.getElementById("restartButton");

const pScore0 = document.querySelector("#score--0");
const pScore1 = document.querySelector("#score--1");

// * set initial time value to 5 minutes(300 seconds)
const initialTime = 300;

// * Update the timer element with the initial value
const timerElement = document.getElementById("timer");
let timeLeft = initialTime;
let timeInterval;
let currentScore, activePlayer;

window.onload = () => {
  // count of div elements to add
  const count = 100;
  for (let x = 0; x < count; x++) {
    //create new div element
    const newDiv = createGridElement(x, "container1");
    const newDiv2 = createGridElement(x, "container2");

    // append the new div to container
    container1Div.appendChild(newDiv);
    container2Div.appendChild(newDiv2);
  }
};

function createGridElement(index, containerId) {
  // assign class & style to div
  const newDiv = document.createElement("div");
  newDiv.classList.add("grid", "grid" + index);
  newDiv.style.cssText = "width:10%;height:10%;";
  return newDiv;
}

// * Initial state of game
function init() {
  activePlayer = 0;
  currentScore = 0;
  score1 = 0;
  score2 = 0;

  pScore0.textContent = 0;
  pScore1.textContent = 0;

  diceButton.disabled = true;
  submitButton.disabled = true;
  restartGameBtn.disabled = true;

  const allRed = document.querySelectorAll(".red-color");
  allRed.forEach((element) => {
    element.classList.remove("red-color");
  });
  const allGreen = document.querySelectorAll(".green-color");
  allGreen.forEach((element) => {
    element.classList.remove("green-color");
  });

  start.style.display = "inline-block";
  clearInterval(timeInterval);
  timeLeft = initialTime;
  timerElement.innerHTML = formatTime(timeLeft);
}
init();

function startGame(button) {
  container1Div.classList.add("disabledGrid");
  container2Div.classList.add("disabledGrid");

  setGridClickHandlers("container1", "red-color");
  setGridClickHandlers("container2", "green-color");

  button.style.display = "none";
  diceButton.disabled = false;
  restartGameBtn.disabled = false;
  clearInterval(timeInterval);

  timeInterval = setInterval(function () {
    timeLeft--;
    timerElement.innerHTML = formatTime(timeLeft);

    if (timeLeft === 0) {
      clearInterval(timeInterval);
      timeLeft = initialTime;
      timerElement.innerHTML = formatTime(timeLeft);
    }
  }, 1000);
}

function setGridClickHandlers(containerId, colorClass) {
  const anchors = document
    .getElementById(containerId)
    .getElementsByClassName("grid");
  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i];
    anchor.onclick = () => {
      anchor.classList.add(colorClass);
    };
  }
}

function switchPlayer() {
  const scoreElement = document.getElementById(`score--${activePlayer}`);
  scoreElement.textContent = activePlayer === 0 ? score1 : score2;

  // switching active player from 0 to 1 and 1 to 0
  activePlayer = activePlayer === 0 ? 1 : 0;
}

function toggleGrid() {
  container1Div.classList.toggle("disabledGrid");
  container2Div.classList.toggle("disabledGrid");
}

const generateRandomDiceNumber = () => {
  return randomDiceNumber[Math.floor(randomDiceNumber.length * Math.random())];
};

diceButton.addEventListener("click", (_e) => {
  const diceOneRandomDigit = generateRandomDiceNumber();
  const diceTwoRandomDigit = generateRandomDiceNumber();
  diceImageOne.setAttribute("src", `image/dice${diceOneRandomDigit}.png`);
  diceImageTwo.setAttribute("src", `image/dice${diceTwoRandomDigit}.png`);
  setItem("dices", JSON.stringify([diceOneRandomDigit, diceTwoRandomDigit]));
  _e.target.disabled = true;
  if (activePlayer === 0) {
    container1Div.classList.toggle("disabledGrid");
  } else if (activePlayer === 1) {
    container2Div.classList.toggle("disabledGrid");
  }

  submitButton.disabled = false;
  remarkButton.disabled = false;
  currentScore = diceOneRandomDigit * diceTwoRandomDigit;
  if (activePlayer === 0) {
    score1 += currentScore;
  } else if (activePlayer === 1) {
    score2 += currentScore;
  }

  switchPlayer();
});

submitButton.addEventListener("click", () => {
  if (activePlayer === 1) {
    container1Div.classList.toggle("disabledGrid");
  } else if (activePlayer === 0) {
    container2Div.classList.toggle("disabledGrid");
  }

  diceButton.disabled = false;
  remarkButton.disabled = true;
  currentScore = 0;
});

remarkButton.addEventListener("click", () => {
  if (activePlayer === 1) {
    const allRed = document.querySelectorAll(".red-color");
    allRed.forEach((element) => {
      element.classList.remove("red-color");
    });
  } else if (activePlayer === 0) {
    const allGreen = document.querySelectorAll(".green-color");
    allGreen.forEach((element) => {
      element.classList.remove("green-color");
    });
  }
});

function formatTime(timeValue) {
  const minutes = Math.floor(timeValue / 60);
  const seconds = timeValue % 60;
  return (
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0")
  );
}

function restartGame() {
  init();
}

//  * Store a data into a localstorage
//  * @params key
//  * @params data
const setItem = (key, value) => {
  localStorage.setItem(key, value);
};

// * get a data from a localstorage
// * @params key
const getItem = (key) => {
  return localStorage.getItem(key);
};

// sets player1 and player2 names from user input and hides input
function setPlayerName(num){
  const playerName = document.getElementById(`player${num}Name`);
  playerName.innerHTML = document.getElementById(`player${num}NameInput`).value;
  // hides input field and button after submitting name
  document.getElementById(`divPlayer${num}Name`).style.display = 'none';
}