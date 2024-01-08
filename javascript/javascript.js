// Global object to store color-related data
const colorData = {
    randomColorLeft: "",
    randomColorRight: "",
    greyscaleValueLeft: 0,
    greyscaleValueRight: 0,
};

resetGame();

function resetGame() {
    generateRandomColors();
}

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

    // Now you have greyscale values for comparison
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
