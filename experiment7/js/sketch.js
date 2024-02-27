// sketch.js - purpose and description here
// Author: Jimmy Nguyen
// Date: 2/26/24

let covidData;

function preload() {
  // Load the JSON data file before the sketch starts
  //covidData = loadJSON('https://covid.ourworldindata.org/data/owid-covid-data.json');
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

    textFont("Arial", 24);
    textAlign(CENTER, CENTER);

    for (let row of covidData.rows) {
      let country = row.get('location');
      let totalCases = row.getNum('total_cases');
      console.log(`Country: ${country}, Total Cases: ${totalCases}`);
    }
    //noLoop(); // Draw only once
}
/*
// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(240);

  // Example: Visualizing total cases over time for a specific country
  let country = 'USA';
  let dataForCountry = covidData[country];

  if (dataForCountry) {
    // Plotting total cases over time
    stroke(0);
    noFill();
    beginShape();
    for (let i = 0; i < dataForCountry.length; i++) {
      let x = map(i, 0, dataForCountry.length - 1, 0, width);
      let y = map(dataForCountry[i].total_cases, 0, 1e7, height, 0);
      vertex(x, y);
    }
    endShape();
  }
}
*/