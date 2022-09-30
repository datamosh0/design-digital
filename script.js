let canvas = document.querySelector("#scene"),
  canvas2 = document.querySelector("#scene2"),
  ctx = canvas.getContext("2d"),
  ctx2 = canvas2.getContext("2d"),
  initParticles = [],
  particles = [],
  amount = 0,
  mouse = { x: 0, y: 0 },
  radius = 1;

let colors = ["#d2d4dc", "#afafaf ", "#f8f8fa ", "#e5e6eb ", "#c0c2ce"];
let titles = [" digital", "     tomorrow", "  the web"];

let design = "design";
let value = titles[0];

let ww = (canvas.width = window.innerWidth);
let wh = (canvas.height = window.innerHeight);

let ww2 = (canvas2.width = window.innerWidth);
let wh2 = (canvas2.height = window.innerHeight);

function initParticle(x, y, designer = false) {
  this.x = 0.5 * ww;
  this.y = 0.5 * wh;
  this.dest = {
    x: x - ww2 * 0.17,
    y: y - wh2 * 0.25,
  };
  if (designer) {
    this.dest = {
      x: x + ww2 * 0.17,
      y: y - wh2 * 0.25,
    };
  }

  this.r = 5;
  if (ww < 768) this.r = 3;
  if (ww < 480) this.r = 2;
  this.vx = 0.5;
  this.vy = 0.5;
  this.accX = 0;
  this.accY = 0;
  this.friction = 0.95;

  this.color = colors[Math.floor(Math.random() * 6)];
}

function Particle(x, y) {
  this.x = Math.random() * ww2;
  this.y = Math.random() * wh2;
  this.dest = {
    x: x + ww2 * 0.17,
    y: y - wh2 * 0.25,
  };
  this.r = 5;
  if (ww < 768) this.r = 3;
  if (ww < 480) this.r = 2;
  this.vx = (Math.random() - 0.5) * 70;
  this.vy = (Math.random() - 0.5) * 70;
  this.accX = 0;
  this.accY = 0;
  this.friction = 0.95;

  this.color = colors[Math.floor(Math.random() * 6)];
}
Particle.prototype.render = function () {
  this.accX = (this.dest.x - this.x) / 500;
  this.accY = (this.dest.y - this.y) / 500;

  this.vx += this.accX;
  this.vy += this.accY;
  this.vx *= this.friction;
  this.vy *= this.friction;

  this.x += this.vx;
  this.y += this.vy;

  ctx2.fillStyle = this.color;
  ctx2.beginPath();
  ctx2.arc(this.x, this.y, this.r, Math.PI * 2, false);
  ctx2.fill();

  let a = this.x - mouse.x;
  let b = this.y - mouse.y;

  let distance = Math.sqrt(a * a + b * b);
  if (distance < radius * 70) {
    this.accX = (this.x - mouse.x) / 100;
    this.accY = (this.y - mouse.y) / 100;
    this.vx += this.accX;
    this.vy += this.accY;
  }
};
initParticle.prototype.render = function () {
  this.accX = (this.dest.x - this.x) / 400;
  this.accY = (this.dest.y - this.y) / 400;

  this.vx += this.accX;
  this.vy += this.accY;
  this.vx *= this.friction;
  this.vy *= this.friction;

  this.x += this.vx;
  this.y += this.vy;

  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
  ctx.fill();

  let a = this.x - mouse.x;
  let b = this.y - mouse.y;

  let distance = Math.sqrt(a * a + b * b);
  if (distance < radius * 70) {
    this.accX = (this.x - mouse.x) / 100;
    this.accY = (this.y - mouse.y) / 100;
    this.vx += this.accX;
    this.vy += this.accY;
  }
};
initParticle.prototype.resize = function (width, height) {
  this.canvasWidth = window.innerWidth;
  this.canvasHeight = window.innerHeight;
  this.render();
};
Particle.prototype.resize = function (width, height) {
  this.canvasWidth = window.innerWidth;
  this.canvasHeight = window.innerHeight;
  this.render();
};

function onMouseMove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}
function onTouchMove(e) {
  if (e.touches.length > 0) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }
}
function onTouchEnd(e) {
  mouse.x = -9999;
  mouse.y = -9999;
}

function initScene() {
  ctx.font = "bold " + ww / 10.5 + "px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("design", ww / 2, wh / 2);

  let data = ctx.getImageData(0, 0, ww, wh2).data;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "screen";

  initParticles = [];
  for (let i = 0; i < ww2; i += Math.round(ww2 / 150)) {
    for (let j = 0; j < wh2; j += Math.round(ww2 / 150)) {
      if (data[(i + j * ww2) * 4 + 3] > 150) {
        initParticles.push(new initParticle(i, j));
      }
    }
  }
  amount = initParticles.length;
}

function tickScene(changes = false) {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  ctx2.font = "bold " + ww2 / 10 + "px sans-serif";
  ctx2.textAlign = "center";
  ctx2.fillText(value, ww2 / 2, wh2 / 2);

  let data = ctx2.getImageData(0, 0, ww2, wh2).data;
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  ctx2.globalCompositeOperation = "screen";

  particles = [];
  for (let i = 0; i < ww2; i += Math.round(ww2 / 150)) {
    for (let j = 0; j < wh2; j += Math.round(ww2 / 150)) {
      if (data[(i + j * ww2) * 4 + 3] > 150) {
        if (!changes) particles.push(new initParticle(i, j, true));
        else particles.push(new Particle(i, j));
      }
    }
  }
  amount = particles.length;
}

let frame1, frame2;

function renderInit() {
  frame1 = requestAnimationFrame(renderInit);
  ctx.clearRect(0, 0, canvas2.width, canvas2.height);
  for (let i = 0; i < amount; i++) {
    try {
      initParticles[i].render();
    } catch (e) {}
  }
}
function renderChange() {
  frame2 = requestAnimationFrame(renderChange);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  for (let i = 0; i < amount; i++) {
    particles[i].render();
  }
}

window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("touchend", onTouchEnd);

initScene();
frame1 = requestAnimationFrame(renderInit);

tickScene();
frame2 = requestAnimationFrame(renderChange);

window.addEventListener("resize", function () {});
let titleIndex = 0;
let titleInterval = setInterval(function () {
  titleIndex++;
  if (titleIndex > 2) titleIndex = 0;
  value = titles[titleIndex];
  tickScene(true);
}, 30000);

window.addEventListener("resize", function () {
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;

  ww2 = canvas2.width = window.innerWidth;
  wh2 = canvas2.height = window.innerHeight;
  cancelAnimationFrame(frame1);
  cancelAnimationFrame(frame2);

  initScene();
  frame1 = requestAnimationFrame(renderInit);

  tickScene();
  frame2 = requestAnimationFrame(renderChange);
});

let audio = document.querySelector(".audioElement");
audio.volume = 0.2;
let mute = document.querySelector(".mute");
let unmute = document.querySelector(".unmute");
let hammer = document.querySelector(".hammer");
let reject = document.querySelector(".reject");
let bgVideo = document.querySelector(".bg-video");
let audioElement = document.querySelector(".audioElement");
audioElement.addEventListener("ended", function () {
  mute.style.display = "none";
  reject.style.display = "none";
  hammer.style.display = "none";
  unmute.style.display = "inline";
});
unmute.addEventListener("click", function () {
  audio.play();
  if (bgVideo.paused) bgVideo.play();
  unmute.style.display = "none";
  mute.style.display = "inline";
  reject.style.display = "inline";
  hammer.style.display = "inline";
});
mute.addEventListener("click", function () {
  audio.pause();
  bgVideo.pause();
  mute.style.display = "none";
  reject.style.display = "none";
  hammer.style.display = "none";
  unmute.style.display = "inline";
});
