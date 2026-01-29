// Fourier Series
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/125-fourier-series.html
// https://youtu.be/Mm2eYfj0SgA
// https://editor.p5js.org/codingtrain/sketches/SJ02W1OgV

let time = 0;
let wave = [];

let slider;

function setup() {
  createCanvas(800, 400);
  slider = createSlider(1, 40, 1);
  speedslider = createSlider(0, 100, 45);
}

function draw() {
  strokeWeight(2);
  background(0);
  translate(150, 200);

  let x = 0;
  let y = 0;

  for (let i = 0; i < slider.value(); i++) {
    let prevx = x;
    let prevy = y;
   let n = i * 2 + 1;
    // let n = i+1;
    // let radius = -75 * ((4 / (n * PI))**2);
    let radius = 75 * ((4 / (n * PI)));
    // radius = radius * (-1)**(i+1);
    x += radius * cos(n * time);
    y -= radius * sin(n * time);

    stroke(255,255,0, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2);

    //fill(255);
    stroke(0,0,255);

    line(prevx, prevy, x, y);
    ellipse(x, y, 8);
  }
  wave.push(y);
  translate(200, 0);
  stroke(0,255,0);
  strokeWeight(1);
  line(x - 200, y, wave.length, y);
  strokeWeight(2);
  stroke(0,0,255);
  beginShape();
  noFill();
  for (let i = 0; i < wave.length; i++) {
    vertex(i, wave[i]);
  }
  endShape();
  time += speedslider.value()/1000;

  if (wave.length > 400) {
    wave.shift();
  }
}
