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
    beep = loadSound('sounds/beep.mp3');
    longerBeep = loadSound('sounds/longerBeep.mp3');
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
    background(255);

    // Display Morse code
    fill(0);
    text(morseCode, width / 2, height / 2);
}

function textToMorse(text) {
    let morseCode = "";
    for (let i = 0; i < text.length; i++) {
      let char = text.charAt(i).toUpperCase();
      if (char === " ") {
        morseCode += " / "; //space between words
      } else {
        let morseChar = charToMorse(char);
  
        setInterval( playNextSound(morseChar), 1000);
        
        morseCode += morseChar + " ";
      }
    }
    return morseCode;
  }
  
  function playNextSound(morseChar) {
    console.log(morseChar);
    const beepDuration = 200;
    const longerBeepDuration = 375;
    const spacePauseDuration = 300;
    
    for (let i = 0; i <= morseChar.length; i++) {
      let currentChar = morseChar[i];
      
      const playSoundWithDelay = (sound, duration) => {
        setTimeout(() => {
          sound.play();
        }, duration);
      };
      
      if (currentChar === '.') {
        delay += beepDuration;
        playSoundWithDelay(beep, delay);
      } else if (currentChar === '-') {
        delay += longerBeepDuration;
        playSoundWithDelay(longerBeep, delay);
      } else {
        delay += spacePauseDuration;
        setTimeout(() => {}, delay);
      }
    }
  }
  
  function charToMorse(char) {
    switch (char) {
      case "A": return ".-";
      case "B": return "-...";
      case "C": return "-.-.";
      case "D": return "-..";
      case "E": return ".";
      case "F": return "..-.";
      case "G": return "--.";
      case "H": return "....";
      case "I": return "..";
      case "J": return ".---";
      case "K": return "-.-";
      case "L": return ".-..";
      case "M": return "--";
      case "N": return "-.";
      case "O": return "---";
      case "P": return ".--.";
      case "Q": return "--.-";
      case "R": return ".-.";
      case "S": return "...";
      case "T": return "-";
      case "U": return "..-";
      case "V": return "...-";
      case "W": return ".--";
      case "X": return "-..-";
      case "Y": return "-.--";
      case "Z": return "--..";
      case "0": return "-----";
      case "1": return ".----";
      case "2": return "..---";
      case "3": return "...--";
      case "4": return "....-";
      case "5": return ".....";
      case "6": return "-....";
      case "7": return "--...";
      case "8": return "---..";
      case "9": return "----.";
  
      // Use "/" for space between words
      default: return "";
    }
  }