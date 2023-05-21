

const diceButton = document.querySelector("#diceButton");
const diceImageOne = document.querySelector("#diceImage1");
const diceImageTwo = document.querySelector("#diceImage2");
const randomDiceNumber = [1, 2, 3, 4, 5, 6];

//set initial timer value to 5 minutes(300 seconds)
var initialTime = 300;

// Update the timer element with the initial value
var timerElement = document.getElementById("timer");
var timeLeft = initialTime;
var timeInterval;

window.onload = () => {
  //count of div elements to add
  const count = 100;
  for (let x = 0; x < count; x++) {
    //Create new div element
    const newDiv = document.createElement("div");
    const newDiv2 = document.createElement("div");
    //assign class & style to div
    newDiv.classList.add("grid", "grid" + x);
    newDiv.style.cssText = "width:10%;height:10%;";
    newDiv2.classList.add("grid", "grid" + x);
    newDiv2.style.cssText = "width:10%;height:10%;";
    //append new div to container
    document.getElementById("container1").appendChild(newDiv);
    document.getElementById("container2").appendChild(newDiv2);
  }
};

function startTimer(button) {
  document.getElementById("container1").classList.add("disabledGrid");
  document.getElementById("container2").classList.add("disabledGrid");

  let anchors = document.getElementById("container1");
  anchors = anchors.getElementsByClassName("grid");
  for (let i = 0; i < anchors.length; i++) {
    let anchor = anchors[i];
    anchor.onclick = () => {
      // let box = e.currentTarget;
      anchor.classList.add("red-color");
    };
  }

  let anchors2 = document.getElementById("container2");
  anchors2 = anchors2.getElementsByClassName("grid");
  for (let i = 0; i < anchors2.length; i++) {
    let anchor2 = anchors2[i];
    anchor2.onclick = () => {
      anchor2.classList.add("green-color");
    };
  }

  button.style.display = "none";
  var Dicebutton = document.getElementById("diceButton");
  var restartbutton = document.getElementById("restartButton");

  Dicebutton.disabled = false;
  restartbutton.disabled = false;

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

const generateRandomDiceNumber = () => {
  return randomDiceNumber[Math.floor(randomDiceNumber.length * Math.random())];
};

diceButton.addEventListener("click", (_e) => {
  // // Generate a random number between 1 and 6
  const diceOneRandomDigit = generateRandomDiceNumber();
  const diceTwoRandomDigit = generateRandomDiceNumber();
  diceImageOne.setAttribute("src", `image/dice${diceOneRandomDigit}.png`);
  diceImageTwo.setAttribute("src", `image/dice${diceTwoRandomDigit}.png`);
  setItem("dices", JSON.stringify([diceOneRandomDigit, diceTwoRandomDigit]));
  _e.target.disabled = true;

  var SubmitButton = document.getElementById("submitButton");
  var remarkButton = document.getElementById("remarkButton");
  SubmitButton.disabled = false;
  remarkButton.disabled = false;

  document.getElementById("container1").classList.remove("disabledGrid");
  document.getElementById("container2").classList.remove("disabledGrid");
})

// Utility function to format a time value (in seconds) as mm:ss
function formatTime(timeValue) {
  var minutes = Math.floor(timeValue / 60);
  var seconds = timeValue % 60;
  return (
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0")
  );
}

function restartGame() {
  var startGame = document.getElementById("startGame");
  startGame.style.display = "inline-block";
  var restartGameBtn = document.getElementById("restartButton");
  restartGameBtn.disabled = true;

  clearInterval(timeInterval);
  timeLeft = initialTime;

  timerElement.innerHTML = formatTime(timeLeft);
}

/**
 * Store a data into a localstorage
 * @params key
 * @params data
 */
const setItem = (key, value) => {
  localStorage.setItem(key, value)
}
/**
* get a data from a localstorage
* @params key
*
*/
const getItem = (key) => {
  const data = localStorage.getItem(key);
  return data
}