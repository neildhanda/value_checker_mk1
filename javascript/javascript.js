// Global object to store color-related data
const colorData = {
    randomColorLeft: "",
    randomColorRight: "",
    greyscaleValueLeft: 0,
    greyscaleValueRight: 0,
};

let userChoice = "*"; // Initial userChoice value
const greaterButton = document.getElementById("greaterButton");
const equalButton = document.getElementById("equalButton");
const lessButton = document.getElementById("lessButton");
const resetButton = document.getElementById("resetButton");

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function colorToGreyscale(color) {
    const rgb = hexToRgb(color);
    return 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
}

function generateRandomColors() {
    const leftSquare = document.getElementById("leftSquare");
    const rightSquare = document.getElementById("rightSquare");

    colorData.randomColorLeft = getRandomColor();
    colorData.randomColorRight = getRandomColor();

    colorData.greyscaleValueLeft = colorToGreyscale(colorData.randomColorLeft);
    colorData.greyscaleValueRight = colorToGreyscale(colorData.randomColorRight);

    leftSquare.style.backgroundColor = colorData.randomColorLeft;
    rightSquare.style.backgroundColor = colorData.randomColorRight;

    // greyscale values for comparison
    console.log(`Left Color: ${colorData.randomColorLeft}, Greyscale Value: ${colorData.greyscaleValueLeft}`);
    console.log(`Right Color: ${colorData.randomColorRight}, Greyscale Value: ${colorData.greyscaleValueRight}`);
}

function hexToRgb(hex) {
    hex = hex.slice(1); // Remove the hash character
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

let correct = 0;
let incorrect = 0;
let percentage = 0;

function resetGame() {
    generateRandomColors();
    correct = 0;
    incorrect = 0;
    percentage = "0.00%";
    correctValueElement.textContent = incorrect.toString();
    incorrectValueElement.textContent = incorrect.toString();
    percentageValueElement.textContent = percentage.toString();
}

function compareValues() {
    switch (userChoice) {
        case '>':
            return colorData.greyscaleValueLeft < colorData.greyscaleValueRight;
        case '<':
            return colorData.greyscaleValueLeft > colorData.greyscaleValueRight;
        case '=':
            return colorData.greyscaleValueLeft === colorData.greyscaleValueRight;
        default:
            return false;
    }
}



function divideAndRound(numerator, denominator) {
    if (denominator === 0) {
        console.error("Cannot divide by zero");
        return NaN;
    }

    const result = (numerator / denominator) * 100;
    const roundedResult = result.toFixed(2); // Round to two decimal places
    return roundedResult + "%";
}
const correctValueElement = document.getElementById("correct-value");
const incorrectValueElement = document.getElementById("incorrect-value");
const percentageValueElement = document.getElementById("percentage-value");

// Update the text content of the element with the value of 'correct'


function checkAnswer() {
    const threshold = 1; // You can adjust this threshold based on your preference

    // Ensure userChoice is valid
    if (userChoice === '*' || userChoice === undefined) {
        console.error("Invalid user choice");
        return;
    }

    // Compare greyscale values and update game state
    const isCorrect = compareValues(colorData.greyscaleValueLeft, colorData.greyscaleValueRight, userChoice, threshold);

    if (isCorrect) {
        console.log("Correct!\nEND_ROUND\n");
        correct++;
        percentage = divideAndRound(correct, incorrect + correct);
        // Update correct score or perform other actions as needed
        correctValueElement.textContent = correct.toString();
        percentageValueElement.textContent = percentage.toString();
    } else {
        console.log("Incorrect!\nEND_ROUND\n");
        incorrect++;
        percentage = divideAndRound(correct, incorrect + correct);
        // Update incorrect score or perform other actions as needed
        incorrectValueElement.textContent = incorrect.toString();
        percentageValueElement.textContent = percentage.toString();
    }
    
    // Generate new colors for the next round
    generateRandomColors();
}


greaterButton.addEventListener("click", function () {
    userChoice = '>';
    checkAnswer();
});

equalButton.addEventListener("click", function () {
    userChoice = '=';
    checkAnswer();
});

lessButton.addEventListener("click", function () {
    userChoice = '<';
    checkAnswer();
});

resetButton.addEventListener("click", function () {
    resetGame();
});
// Call resetGame after event listeners are attached
resetGame();
