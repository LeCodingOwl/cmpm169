// sketch.js - purpose and description here
// Author: Jimmy Nguyen
// Date: 1/22/24

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
// Globals
var colorCount = 20;
var hueValues = [];
var saturationValues = [];
var brightnessValues = [];
var actRandomSeed = 0;
var alphaValue = 75;

// setup() function is called once when the program starts
function setup() {
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");

    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });
}
// draw() function is called repeatedly, it's the main animation loop
function draw() {
    loop();
    background(0, 0, 54.5);
    
    // ------ colors ------
    // create palette
    for (var i = 0; i < colorCount; i++) {
      if (i % 2 == 0) {
        hueValues[i] = random(360);
        saturationValues[i] = 100;
        brightnessValues[i] = random(100);
      } else {
        hueValues[i] = 195;
        saturationValues[i] = random(20);
        brightnessValues[i] = 100;
      }
    }
    
    // --- area tiling ---
    // --- draw lanterns ---
    var counter = 0;
    var rowCount = int(random(5, 30));
    var rowHeight = height / rowCount;
    
    for ( var i = rowCount; i >= 0; i--) {
      var x = random(0, width);
      var y = random(0, height);
      var w = random(5, 15);
      var h = w * 3;
      
      var index = counter % colorCount;
      var col1 = color(0, 0, 54.5);
      var col2 = color(hueValues[index], saturationValues[index], brightnessValues[index], alphaValue);
      gradient(x, y, w, h, col1, col2);
      
      counter++;
    }
}
  function gradient(x, y, w, h, c1, c2) {
    var ctx = drawingContext; // global canvas context p5.js var
    var grd = ctx.createLinearGradient(x, y, x, y + h);
    grd.addColorStop(0, c1.toString());
    grd.addColorStop(1, c2.toString());
    ctx.fillStyle = grd;
    ctx.fillRect(x, y, w, h);
}