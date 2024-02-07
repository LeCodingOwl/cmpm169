// sketch.js - purpose and description here
// Author: Jimmy Nguyen
// Date: 2/6/24

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// Globals
let deck = [];
let cardName = [];
let stars = [];

let yPos;
let targetY;

let textOpacity = 0;
let fadeInSpeed = 2;

let flashAlpha = 0;

let clicked = false;

let charmSound;


function preload() {
    charmSound = loadSound('Sounds/rollingSound.mp3');
  }

// setup() function is called once when the program starts
function setup() {
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");

    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });

    for (let cards of ['Alhaitham', 'Ayato', 'Baizhu', 'Childe', 'Cyno', 'Diluc','Eula', 'Ganyu', 'Hu Tao', 'Itto', 'Jean', 'Kazuha', 'Keqing','Klee', 'Lyney', 'Nahida', 'Neuvillette', 'Raiden', 'Venti','Wanderer', 'Yae Miko', 'Zhongli']) 
    {
        deck.push(loadImage('Genshin_Tarot/${cards}.jpg'));
        cardName.push(cards);
    }
  
    yPos = height + 500;
    targetY = height / 2;
  
    for (let i = 0; i < 100; i++) {
    stars[i] = createStar();
    }
  
    shuffleDeck();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    background(0, 0, 54.5)
  
    flashAlpha -= 5;
  
    image(deck[0], width / 2 - deck[0].width / 2, yPos -  deck[0].height / 2);
  
    if (clicked) {
      for (let star of stars) {
        star.move();
        star.display();
        
        textOpacity = min(textOpacity + fadeInSpeed, 255);
        
        fill(255, 255, 255, textOpacity);
        stroke(0);
        strokeWeight(4);
        textSize(32);
        textAlign( CENTER, CENTER);
        
        let centerX = width / 2;
        let centerY = height /2 + 150;
        
        text(cardName[0], centerX, centerY);
        
      }
      yPos = lerp(yPos, targetY, 0.1);
    }
    
    
    if (flashAlpha > 0) {
      background(0, 0, 54.5, flashAlpha);
    }
}

function mousePressed() {
    target = height / 2;
    if (!clicked) {
      flashAlpha = 255;
      charmSound.play();
    }  
    clicked = true;
  }
  
  function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = floor(random(i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
      [cardName[i], cardName[j]] = [cardName[j], cardName[i]];
    }
  }
  
  function createStar() {
    return {
      x: random(width),
      y: random(height),
      size: random(1, 5),
      speed: random(1, 5),
  
      move: function() {
        this.y += this.speed;
        if (this.y > height) {
          this.y = 0;
          this.x = random(width);
        }
      },
  
      display: function() {
        fill(255, 255, 0);
        noStroke();
        rect(this.x, this.y, this.size, this.size, 20);
      }
    };
  }