let fft

let Particle = function (position) {
  this.position = position
  this.speed = createVector(0, 1)
  this.color = [random(0, 255), random(0, 255), random(0, 255)]
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()

  let mic = new p5.AudioIn()
  mic.start()

  fft = new p5.FFT()
  fft.setInput(mic)

  positionParticles()
}

function draw() {}