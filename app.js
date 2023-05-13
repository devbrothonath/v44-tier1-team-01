
function rollDice() {
  // Generate a random number between 1 and 6
  var diceNumber1 = Math.floor(Math.random() * 6) + 1;
  var diceNumber2 = Math.floor(Math.random() * 6) + 1;

  // Update the image source based on the random number
  var diceImage1 = document.getElementById("diceImage1");
  diceImage1.src = "Images/dice" + diceNumber1 + ".png";
  var diceImage2 = document.getElementById("diceImage2");
  diceImage2.src = "Images/dice" + diceNumber2 + ".png";

  var SubmitButton = document.getElementById("submitButton");
  var remarkButton = document.getElementById("remarkButton");
  SubmitButton.disabled = false;
  remarkButton.disabled = false;
}

//set initial timer value to 5 minutes(300 seconds)
var initialTime = 300;

// Update the timer element with the initial value
var timerElement = document.getElementById("timer");
var timeLeft = initialTime;
var timeInterval;

function startTimer(button) {
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

  //
  let anchors = document.getElementById("container1");
  anchors = anchors.getElementsByClassName("grid");
  for (let i = 0; i < anchors.length; i++) {
    let anchor = anchors[i];
    anchor.onclick = () => {
      // let box = e.currentTarget;
      anchor.classList.add("red-color");
    };
  }
  // function remarkGrid(button) {
  //   var button = document.getElementById("remarkButton")
  //   anchors.classList.remove("red-color");
  // }
  let anchors2 = document.getElementById("container2");
  anchors2 = anchors2.getElementsByClassName("grid");
  for (let i = 0; i < anchors2.length; i++) {
    let anchor2 = anchors2[i];
    anchor2.onclick = () => {
      anchor2.style.backgroundColor = "green";
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
