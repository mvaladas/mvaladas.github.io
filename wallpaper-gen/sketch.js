var mainColor;
var offInc = 0.005
var ranges = 3;
var skySize;
var landSize;
var output;
var canvas;
var scaleOutput = 1;

function setup() {
  createCanvas(270, 480);
  colorMode(HSB, 255);
  skySize = height / 6;
  landSize = height - skySize;
  output = createGraphics(270,480);
  output.colorMode(HSB, 255);
  mainColor = output.color(random(255), random(200), random(100, 200));

  // button = createButton('Refresh');
  // button.mousePressed(Refresh);
  button = createButton('Download High-res');
  button.mousePressed(DL);
}

function draw() {
   // Clear Canvas
  background(255);
  output.clear();
  output.push();
  output.scale(scaleOutput);
  output.background(mainColor);
  output.noStroke()
  let sat = output.saturation(mainColor);
  let bright = output.brightness(mainColor);
  var xoff = 0;
  for (let i = 0; i < ranges; i++) {
    bright *= 1.1;
    sat *= 0.8;
    output.fill(hue(mainColor), sat, bright);
    output.beginShape();
    output.vertex(width, height);
    output.vertex(0, height);
    for (let x = 0; x < width; x++) {
      // let y = map(noise(xoff), 0, 1, 
      // (((height-skySize) / ranges) * (i)) + skySize,
      // (((height-skySize) / ranges) * (i + 1)) + skySize)
      let y = map(noise(xoff), 0, 1, skySize+(landSize / ranges)*i, height);
      output.vertex(x, y);
      // xoff += offInc * (ranges - i) * 2;
      xoff += offInc;
    }
    output.endShape(CLOSE);
    xoff += 10;
  }
  output.pop();
  image(output, 0, 0);
  // noLoop();
}

function DL() {
  // HighRes Export
  scaleOutput = 8;
  output = createGraphics(scaleOutput * 270, scaleOutput * 480);
  output.colorMode(HSB, 255);
  draw();
  save(output, "Wallpaper.png");

  // Reset Default
  scaleOutput = 1;
  output = createGraphics(270,480);
  output.colorMode(HSB, 255);
  draw();
}
