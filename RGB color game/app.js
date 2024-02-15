let colors = [];
let numSquares = 6;
let pickedColor;

const h1 = document.querySelector("h1");
const colorDisplay = document.querySelector(".color-display");
const message = document.querySelector(".message");
const resetbtn = document.querySelector(".reset");
const modebtns = document.querySelectorAll(".mode");
const squares = document.querySelectorAll(".square");

// Functions

resetbtn.addEventListener("click", reset);

function setupSquares() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].addEventListener("click", function () {
            let clickedColor = this.style.backgroundColor;

            // Convert colors to RGB format for comparison
            let clickedRgb = getRGB(clickedColor);
            let pickedRgb = getRGB(pickedColor);

            if (arraysEqual(clickedRgb, pickedRgb)) {
                message.textContent = "Correct";
                resetbtn.textContent = "Play Again";
                h1.style.backgroundColor = pickedColor;
                changeColors(pickedColor);        

            } else {
                this.style.backgroundColor = "#232323";
                message.textContent = "Try Again";
            }
        });
    }
}

function getRGB(color) {
    // Extract RGB values from the "rgb(r, g, b)" format
    let rgbArray = color.match(/\d+/g);
    return rgbArray.map(Number);
}

function arraysEqual(arr1, arr2) {
    // Compare two arrays for equality
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}


function setupMode() {
    for (let i = 0; i < modebtns.length; i++) {
        modebtns[i].addEventListener("click", function () {
            for (let j = 0; j < modebtns.length; j++) {
                modebtns[j].classList.remove("selected");
            }
            this.classList.add("selected");
            if (this.textContent === "Easy") {
                numSquares = 3;
            } else {
                numSquares = 6;
            }
            reset();
        });
    }
}

function reset() {
    colors = getRandomColors(numSquares);
    pickedColor = chooseColor();
    colorDisplay.textContent = pickedColor;
    h1.style.backgroundColor = "steelblue";
    resetbtn.textContent = "New Color";
    message.textContent = "";
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
}

function changeColors(color) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function chooseColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function getRandomColors(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(makeColors());
    }
    return arr;
}

function makeColors() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}

// Start the game
function Start() {
    colorDisplay.textContent = pickedColor;
    setupSquares();
    setupMode(); // Eklediğim düzeltme
    reset();
}

Start();
