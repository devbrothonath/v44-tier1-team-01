const diceb = document.querySelector("#diceb");
const diceImageOne = document.querySelector("#diceImageOne");
const diceImageTwo = document.querySelector("#diceImageTwo");
const randomDiceNumber = [1, 2, 3, 4, 5, 6];

window.onload = () => {
    //count of div elements to add
    const count = 100;
    for (let x = 0; x < count; x++) {
        //Create new div element
        const newDiv = document.createElement('div');
        const newDiv2 = document.createElement('div');
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
    anchors = anchors.getElementsByClassName("grid")
    for (let i = 0; i < anchors.length; i++) {
        let anchor = anchors[i]
        anchor.onclick = () => {
            anchor.style.backgroundColor = "red"
            diceb.disabled = false;
        }
    }
    let anchors2 = document.getElementById("container2");
    anchors2 = anchors2.getElementsByClassName("grid")
    for (let i = 0; i < anchors2.length; i++) {
        let anchor2 = anchors2[i]
        anchor2.onclick = () => {
            anchor2.style.backgroundColor = "green";
            diceb.disabled = false;
        }
    }
}

const generateRandomeDiceNumber = () => {
    return (randomDiceNumber[Math.floor(randomDiceNumber.length * Math.random())]);
}

diceb.addEventListener('click', (_e) => {
    const diceOneRandomDigit = generateRandomeDiceNumber();
    const diceTwoRandomDigit = generateRandomeDiceNumber();
    diceImageOne.setAttribute("src", `image/dice${diceOneRandomDigit}.png`);
    diceImageTwo.setAttribute("src", `image/dice${diceTwoRandomDigit}.png`);
    setItem("dices", JSON.stringify([diceOneRandomDigit, diceTwoRandomDigit]));
    _e.target.disabled = true
});
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