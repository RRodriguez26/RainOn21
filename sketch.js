let particles = [];
const num = 3000;
radius = 160
let font, fontsize = 100;
//smallCircleRadius = 40;

var song;
var fft;
ampEffect  = 0;

var p5Canvas;

//const noiseScale = 0.01/2;
var noiseScale = 0.01/2;

 function preload() {
   song = loadSound('./21Song.mp3');
 }

function setup() {
  createCanvas(800, 800);

  for(let i = 0; i < num; i ++) {
    particles.push(createVector(random(width), random(height)));
  }
  
  stroke(255);
  // For a cool effect try uncommenting this line
  // And comment out the background() line in draw
  //stroke(255, 10);
}

function draw() {
  background(0, 10);
  
  fill(0);
  stroke(255);
  
  //ellipse(width/2, height/2, radius * 2);
  //rect(width /2, height /2, width/2, height/2)

  textSize(500);
  textFont("Georgia");
  text("21", width / 5, height /1.5);

  // //help react to the beats
  //fft.analyze();
  //amp = fft.getEnergy(20, 200);

  for(let i = 0; i < num; i++) {
    let p = particles[i];
    point(p.x, p.y);
    strokeWeight(4);
    let n = noise(p.x * noiseScale, p.y * noiseScale, frameCount * noiseScale);
    let a = TAU * n;
    // p.x += cos(a);
    // p.y += sin(a);
    p.x += sin(a)
    p.y += a
    if(!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }
    
    //capturer.capture(document.getElementById('canvas'));
  }
  
  fill(255);
  stroke(0);
  
  console.log(frameCount);
    
}

function mouseReleased() {
  noiseSeed(millis());
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}
function backgroundChange() {
    if (amp > 152) {
      ampEffect = 150;
    } 
  
    if (ampEffect > 0) {
      ampEffect -= 5;
    }
  
    background(color(ampEffect));
  
  }

 function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
    //noLoop();
  } else {
    song.play();
    //loop();
  }
}