// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
let covidData;

function preload() {
  // Load the COVID-19 data in CSV format
  covidData = loadTable('api/owid-covid-data.csv', 'csv', 'header');
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
  // Access the data and perform operations
  for (let row of covidData.rows) {
    let country = row.get('location');
    let totalCases = row.getNum('total_cases');
    console.log(`Country: ${country}, Total Cases: ${totalCases}`);
  }
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {

}