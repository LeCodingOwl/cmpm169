// sketch.js - purpose and description here
// Author: Jimmy Nguyen
// Date: 2/19/24

let inputText = "Hello World";
let morseCode = "";
let frameCounter = 0;
let currentCharIndex = 0;
let currentMorseIndex = 0;
let delay = 0;

function preload() {
    beep = loadSound('beep.mp3');
    longerBeep = loadSound('longerBeep.mp3');
}

// setup() function is called once when the program starts
function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });

    textFont("Arial", 24);
    textAlign(CENTER, CENTER);

    // Convert input text to Morse code
    morseCode = textToMorse(inputText);
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {

}