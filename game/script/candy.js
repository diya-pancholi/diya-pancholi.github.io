var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;
var innerh = window.innerHeight - 100;
var c = canvas.getContext("2d");

var scorec = 0;
const save_key_score_c = "highscorec";
var highScorec = localStorage.getItem(save_key_score_c);

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
      if (element.boole == 0) {
        scorec++;
        const currentdisc = document.querySelector("#nowscc");
        currentdisc.innerHTML = "SCORE: " + scorec;

        element.boole = 1;
        if (highScorec < scorec) {
          highScorec = scorec;
          localStorage.setItem(save_key_score_c, highScorec);
        }
      }
      console.log(scorec);
    }
  });
  console.log(mouse);
});

var colorArray = [
  "#c18de885",
  "#FF85AA85",
  "#A3B8FF85",
  "#89E8E885",
  "#96FFA785",
];
class Circle {
  constructor(x, y, dx, dy, radius, boole) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.boole = boole;

    this.color = colorArray[Math.floor(Math.random() * 5)];
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
  drawtwo = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "black";
    c.lineWidth = 10;

    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  };
  update = function () {
    if (this.boole == 1) this.drawtwo();
    else this.draw();
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
function genbub() {
  for (let i = 0; i < 100; i++) {
    let radius = 50 - Math.random() * 20;
    let x = innerWidth / 2 + (Math.random() - 0.5) * 100;
    let y = innerh / 2 + (Math.random() - 0.5) * 100;
    let dx = (Math.random() - 0.5) * 20;
    let dy = (Math.random() - 0.5) * 20;
    let boole = 0;

    circleArray.push(new Circle(x, y, dx, dy, radius, boole));
  }
}
const highscoredisc = document.querySelector("#highscc");
highscoredisc.innerHTML = "BEST: " + highScorec;

const currentdisc = document.querySelector("#nowscc");
currentdisc.innerHTML = "SCORE: " + scorec;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerh);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

function newGamec() {
  var scorestrc = localStorage.getItem(save_key_score_c);
  if (scorestrc == null) highScorec = 0;
  else highScorec = parseInt(scorestrc);
  genbub();
  animate();
}

newGamec();
