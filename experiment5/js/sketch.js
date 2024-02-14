// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

let scale = 20;
let cols, rows;
let w = 1400;
let h = 1000;

let song;
let fft;

let flightPos = 0;

let terrain = [];

let Controls = function() {
    this.flightSpeed = 0.08;
    this.noiseDelta = 0.16;
    this.terrainHeight = 112;
};
let controls = new Controls();

function preload() {
    //img = loadImage('retroSun.png');
    song = loadSound('sounds/Toothless Dancing.mp3');
}

// setup() function is called once when the program starts
function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });

    fft = new p5.FFT();
    fft.setInput(song);
    song.play();
  
    //cols = w / scale;
    cols = 255;
    rows = h / scale;
    for (let x = 0; x < cols; ++x) {
        terrain[x] = [];
    }

}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  //background(img);
    background(51);
    flightPos -= controls.flightSpeed;
    shiftNoiseSpace();
    stroke(0, 255, 255);
    noFill();
    //image(img, (width / 2) - 950, (height / 2) - 750);

    rotateX(PI / 3);
  
    translate((-w / 2) + 1, (-h / 2) + 30);

    for (let y = 0; y < rows - 1; ++y) {
        beginShape(TRIANGLE_STRIP);
        for (let x = 0; x < cols; ++x) {
            vertex(x * scale, y * scale, terrain[x][y]);
            vertex(x * scale, (y + 1) * scale, terrain[x][y + 1]);
        }
        endShape();
    }
}

function shiftNoiseSpace() {
    let yOffset = flightPos;
    let spectrum = fft.analyze();
    for (let y = 0; y < rows; ++y) {
        let xOffset = 0;
        for (let x = 0; x < cols; ++x) {
            terrain[x][y] = map(noise(spectrum[x], yOffset), 0, 1, -spectrum[y] * 2, spectrum[y] * 2);
            //xOffset += controls.noiseDelta;
        }
        //yOffset += controls.noiseDelta;
    }
}