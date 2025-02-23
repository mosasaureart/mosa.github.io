let images = [];
let glitchImages = [];
let activeGlitch = [false, false, false, false];  // Glitch désactivé au départ
let polaroids = [];
let polaroidTexts = ["Hirena", "Emile", "Lila", "Page"];
let backgroundImg;
let glitchTimers = [0, 0, 0, 0];
let glitchStarted = false;  // Variable pour savoir si le glitch est activé

function preload() {
  for (let i = 0; i < 4; i++) {
    images[i] = loadImage(`assets/PERSO${i * 2 + 1}.jpeg`);
    glitchImages[i] = loadImage(`assets/PERSO${i * 2 + 2}.jpeg`);
  }
  backgroundImg = loadImage("assets/fond.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let polaroidSize = min(width, height) / 3;

  polaroids = [
    { x: width / 4 - polaroidSize / 2, y: height / 4 - polaroidSize / 2, size: polaroidSize },
    { x: (3 * width) / 4 - polaroidSize / 2, y: height / 4 - polaroidSize / 2, size: polaroidSize },
    { x: width / 4 - polaroidSize / 2, y: (3 * height) / 4 - polaroidSize / 2, size: polaroidSize },
    { x: (3 * width) / 4 - polaroidSize / 2, y: (3 * height) / 4 - polaroidSize / 2, size: polaroidSize }
  ];
}

function draw() {
  image(backgroundImg, 0, 0, width, height);

  let currentMillis = millis();

  for (let i = 0; i < polaroids.length; i++) {
    let p = polaroids[i];

    fill(20);
    rect(p.x + 5, p.y + 5, p.size, p.size + 50, 15);

    fill(240);
    rect(p.x, p.y, p.size, p.size + 50, 10);

    if (glitchStarted && activeGlitch[i]) {
      glitchEffect(images[i], glitchImages[i], p.x + 10, p.y + 10, p.size - 20, p.size - 20);
    } else {
      image(images[i], p.x + 10, p.y + 10, p.size - 20, p.size - 20);
    }

    fill(0);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(polaroidTexts[i], p.x + p.size / 2, p.y + p.size + 25);

    if (glitchStarted && !activeGlitch[i] && currentMillis - glitchTimers[i] >= 2000) {
      activeGlitch[i] = true;
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    glitchStarted = true;
    activeGlitch = [true, true, true, true];
  }
}

function mousePressed() {
  if (glitchStarted) {
    for (let i = 0; i < polaroids.length; i++) {
      let p = polaroids[i];
      if (mouseX > p.x && mouseX < p.x + p.size && mouseY > p.y && mouseY < p.y + p.size) {
        activeGlitch[i] = false;
        glitchTimers[i] = millis();
      }
    }
  }
}

function glitchEffect(img1, img2, x, y, w, h) {
  img2.resize(w, h);
  let sections = 10;
  let sectionHeight = h / sections;

  for (let i = 0; i < sections; i++) {
    let srcY = i * sectionHeight;
    let glitchOffset = random(-5, 5);
    image(img2, x + glitchOffset, y + srcY, w, sectionHeight, 0, srcY, img2.width, sectionHeight);
  }
}
