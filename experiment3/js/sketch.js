// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
let errorMessage = {
    x: 50,
    y: 50,
    speedX: 5,
    speedY: 3
  }
  
  let x = 500;
  let y = 300;
  
  let xOff = 0;
  
  let counter = 0;

// setup() function is called once when the program starts
function setup() {
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");

    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });

    background(255);
    
    let squareSize = 40;
    for (let i = 0; i < width; i += squareSize)
      {
        for (let j = 0; j < height; j += squareSize) {
          if ((i /squareSize + j / squareSize) % 2 === 0) {
            fill(200);
          } else {
            fill(255);
          }
          rect(i, j, squareSize, squareSize);
        }
      }
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    errorMessage.x += errorMessage.speedX;
    errorMessage.y += errorMessage.speedY;
    
    if (errorMessage.x < 0 || errorMessage.x > width) {
      errorMessage.speedX *= -1;
    }
    
    if (errorMessage.y < 0 || errorMessage.y > height) {
      errorMessage.speedY *= -1;
    }
    
    text('ERROR', errorMessage.x, errorMessage.y);
    
    stroke(0);
    strokeWeight(2);
    x = map(noise(xOff), 0, 1, 0, width);
    y = map(noise(xOff + 1000), 0, 1, 0, height);
    
    
    drawCat();
    xOff += 0.01;
}

function drawCat() {
    stroke(0, 0, 255); //Sets entire body to black
    rect(x + 50, y + 30, 10, 65); //Front feet
    rect(x + 110, y + 30, 10, 65); //Hind feet
    rect(x, y - 35, 150, 80); //Body
    
    triangle(x - 30, y - 25, x + 48, y - 100, x + 48, y - 25) //Right ear
    triangle(x - 48, y - 25, x - 48, y - 100, x + 30, y - 25) //Left ear
    ellipse(x, y, 120, 120); //Head
    
    stroke(255, 0, 0); //Sets the color of the eyes to red
    drawX(x - 25, y - 10, 25); //Left Eye
    drawX(x + 25, y - 10, 25); //Right Eye
    
    drawMouth(x - 15, y + 20, 25);
  }
  
  function drawX(x, y, size) {
    line(x - size / 2, y - size / 2, x + size / 2, y + size / 2);
    line(x + size / 2, y - size / 2, x - size / 2, y + size / 2);
  }
  
  function drawMouth (x, y, size) {
    line(x - size / 2, y - size / 2, x, y + size / 2);
  
    line(x, y + size / 2, x + size / 2, y - size / 2);
  
    line(x + size / 2, y - size / 2, x + size, y + size / 2);
    
    line(x + size, y + size / 2, 14 + x + size, -25 + y + size / 2);
  }