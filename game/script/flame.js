var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;
var innerh = window.innerHeight - 100;
var c = canvas.getContext("2d");

var scoref = 0;
const save_key_score_f = "highscoref";
var highScoref = localStorage.getItem(save_key_score_f);

document.addEventListener("DOMContentLoaded", () => {
  var name = window.alert(
    "Avoid the water drops. Penalty of 5 points for each drop."
  );
});

window.addEventListener("click", function (event) {
  var x = event.pageX;
  var y = event.pageY - canvas.offsetTop;
  circleArray.forEach((element) => {
    if (
      x - element.x < element.radius &&
      x - element.x > -element.radius &&
      y - element.y < element.radius &&
      y - element.y > -element.radius
    ) {
      element.radius = 0;
      if (element.type == "Fire") scoref++;
      if (element.type == "Virus") scoref -= 5;
      const currentdisf = document.querySelector("#nowscf");
      currentdisf.innerHTML = "SCORE: " + scoref;
    }
    if (highScoref < scoref) {
      highScoref = scoref;
      localStorage.setItem(save_key_score_f, highScoref);
    }
  });
  console.log(mouse);
});

var colorArray = [
  "#ffa630bf",
  "#e86d17bf",
  "#ff4200bf",
  "#e82fiabf",
  "#ff0d37bf",
];
class Virus {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }

  createV = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "white";
    c.lineWidth = 10;
    c.stroke();
    c.fillStyle = "blue";
    c.fill();
    c.beginPath();
    c.arc(this.x, this.y, this.radius - 10, 0, Math.PI * 0.3, false);
    c.strokeStyle = "white";
    c.lineWidth = "6";
    c.stroke();
  };
  move = function () {
    this.createV();
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    this.x += this.dx;
    if (this.y + this.radius > innerh || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.y += this.dy;
  };
}

class Circle {
  constructor(x, y, dx, dy, radius, type) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.type = type;
    if (type == "Fire") this.color = colorArray[Math.floor(Math.random() * 5)];
    else this.color = "blue";
  }

  draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "white";
    c.lineWidth = 10;

    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  };
  update = function () {
    this.draw();
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    this.x += this.dx;
    if (this.y + this.radius > innerh || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.y += this.dy;
  };
}

let circleArray = [];
let virusArray = [];

function createbubf() {
  for (let i = 0; i < 100; i++) {
    let radius = 80 - Math.random() * 20;
    let x = innerWidth / 2 + (Math.random() - 0.5) * 100;
    let y = innerh / 2 + (Math.random() - 0.5) * 100;
    let dx = (Math.random() - 0.5) * 40;
    let dy = (Math.random() - 0.5) * 40;

    circleArray.push(new Circle(x, y, dx, dy, radius, "Fire"));
  }
  for (let i = 0; i < 10; i++) {
    let radius = 40 - Math.random() * 20;
    let x = innerWidth / 2 + (Math.random() - 0.5) * 100;
    let y = innerh / 2 + (Math.random() - 0.5) * 100;
    let dx = (Math.random() - 0.5) * 20;
    let dy = (Math.random() - 0.5) * 20;

    circleArray.push(new Circle(x, y, dx, dy, radius, "Virus"));
  }

  for (let a = 0; a < 10; a++) {
    let radius = 20;
    let x = innerWidth / 2 + (Math.random() - 0.5) * 100;
    let y = innerh / 2 + (Math.random() - 0.5) * 100;
    let dx = (Math.random() - 0.5) * 10;
    let dy = (Math.random() - 0.5) * 10;

    circleArray.push(new Virus(x, y, dx, dy, radius));
  }
}

const highscoredisf = document.querySelector("#highscf");
highscoredisf.innerHTML = "BEST: " + highScoref;

const currentdisf = document.querySelector("#nowscf");
currentdisf.innerHTML = "SCORE: " + scoref;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerh);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
  for (var y = 0; y < virusArray.length; y++) {
    virusArray[y].move();
  }
}
function newGamef() {
  var scorestrf = localStorage.getItem(save_key_score_f);
  if (scorestrf == null) highScoref = 0;
  else highScoref = parseInt(scorestrf);
  createbubf();
  animate();
}

newGamef();
