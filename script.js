let fft;

let Particle = function (position) {
  this.position = position;
  this.speed = createVector(0, 1);
  this.color = [random(0, 255), random(0, 255), random(0, 255)];

  this.draw = function () {
    circle(this.position.x, this.position.y, this.diameter);
    fill(this.color);
  };

  this.update = function (energy) {
    this.diameter = random(5, 7) + energy * 100;

    var centerV = height / 2;
    var centerH = width / 2;

    if (this.position.y < centerV) {
      this.position.x -= this.speed.y * energy * 10;
      this.position.y +=
        ((this.position.x - centerH) / (this.position.y - centerV)) *
        this.speed.y *
        energy *
        30;
    } else {
      this.position.x += this.speed.y * energy * 10;
      this.position.y -=
        ((this.position.x - centerH) / (this.position.y - centerV)) *
        this.speed.y *
        energy *
        30;
    }

    if (
      this.position.y < 0 ||
      this.position.x < 0 ||
      this.position.y > height ||
      this.position.x > width
    ) {
      this.position.y = random(0, height);
      this.position.x = random(0, width);
    }
  };
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  let mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);

  positionParticles();
}

function draw() {
  background(0, 0, 0);
  let spectrum = fft.analyze();
  updateParticles(spectrum);
}

