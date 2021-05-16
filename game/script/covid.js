var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 200;
var innerh = window.innerHeight - 200;
var c = canvas.getContext("2d");

//draw image
/*var snz = document.getElementById("sneeze");
  function imagee() {
   
    c.drawImage(snz, 50, 50);
  }*/

var score = 0;
const save_key_score = "highscore";
var highScore = localStorage.getItem(save_key_score);

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
        score++;
        const currentdis = document.querySelector("#nowsc");
        currentdis.innerHTML = "SCORE: " + score;
      }
      if (highScore < score) {
        highScore = score;
        localStorage.setItem(save_key_score, highScore);
      }
      element.boole = 1;
      console.log(score);
    }
  });
  console.log(mouse);
});

class Circle {
  constructor(x, y, dx, dy, radius, boole) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dx * (1 - Math.random() * 0.3);
    this.radius = radius;
    this.boole = boole;
  }

  draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "white";
    c.lineWidth = 10;

    c.stroke();
    c.fillStyle = "#cc0000";
    c.fill();
    c.beginPath();
    c.arc(this.x, this.y, 27, Math.PI * 0.2, Math.PI * 0.8, false);
    c.strokeStyle = "pink";
    c.lineWidth = 5;
    c.stroke();

    c.beginPath();
    c.moveTo(this.x + 10, this.y - 10);
    c.lineTo(this.x + 25, this.y - 25);
    c.strokeStyle = "white";
    c.lineWidth = 7;
    c.stroke();

    c.beginPath();
    c.moveTo(this.x - 10, this.y - 10);
    c.lineTo(this.x - 25, this.y - 25);
    c.strokeStyle = "white";
    c.lineWidth = 7;
    c.stroke();

    c.beginPath();
    c.moveTo(this.x, this.y - 40);
    c.lineTo(this.x, this.y - 70);
    c.strokeStyle = "#cc0000";
    c.lineWidth = 10;
    c.stroke();

    c.beginPath();
    c.moveTo(this.x, this.y + 40);
    c.lineTo(this.x, this.y + 70);
    c.strokeStyle = "#cc0000";
    c.lineWidth = 10;
    c.stroke();

    c.beginPath();
    c.moveTo(this.x + 40, this.y);
    c.lineTo(this.x + 70, this.y);
    c.strokeStyle = "#cc0000";
    c.lineWidth = 10;
    c.stroke();

    c.beginPath();
    c.moveTo(this.x - 40, this.y);
    c.lineTo(this.x - 70, this.y);
    c.strokeStyle = "#cc0000";
    c.lineWidth = 10;
    c.stroke();

    c.beginPath();
    c.moveTo(this.x + 28.3, this.y - 28.3);
    c.lineTo(this.x + 49.5, this.y - 49.5);
    c.strokeStyle = "#cc0000";
    c.lineWidth = 10;
    c.stroke();

    c.beginPath();
    c.moveTo(this.x + 28.3, this.y + 28.3);
    c.lineTo(this.x + 49.5, this.y + 49.5);
    c.strokeStyle = "#cc0000";
    c.lineWidth = 10;
    c.stroke();

    c.beginPath();
    c.moveTo(this.x - 28.3, this.y - 28.3);
    c.lineTo(this.x - 49.5, this.y - 49.5);
    c.strokeStyle = "#cc0000";
    c.lineWidth = 10;
    c.stroke();

    c.beginPath();
    c.moveTo(this.x - 28.3, this.y + 28.3);
    c.lineTo(this.x - 49.5, this.y + 49.5);
    c.strokeStyle = "#cc0000";
    c.lineWidth = 10;
    c.stroke();
  };
  drawtwo = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "black";
    c.lineWidth = 10;

    c.stroke();
    c.fillStyle = "black";
    c.fill();

    c.beginPath();
    c.moveTo(this.x + 10, this.y - 10);
    c.lineTo(this.x + 25, this.y - 25);
    c.strokeStyle = "white";
    c.lineWidth = 7;
    c.stroke();

    c.beginPath();
    c.moveTo(this.x - 10, this.y - 10);
    c.lineTo(this.x - 25, this.y - 25);
    c.strokeStyle = "white";
    c.lineWidth = 7;
    c.stroke();

    c.beginPath();
    c.moveTo(this.x - 10, this.y - 25);
    c.lineTo(this.x - 25, this.y - 10);
    c.strokeStyle = "white";
    c.lineWidth = 7;
    c.stroke();

    c.beginPath();
    c.moveTo(this.x + 10, this.y - 25);
    c.lineTo(this.x + 25, this.y - 10);
    c.strokeStyle = "white";
    c.lineWidth = 7;
    c.stroke();
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

function createBub() {
  for (let i = 0; i < 100; i++) {
    let radius = 50;
    let x = 50 + Math.random() * 100;
    let y = 50 + Math.random() * 100;
    let dx = Math.random() * 10;
    let dy = (Math.random() - 0.8) * 10;
    let boole = 0;
    //boole is for determining whether the bubbles have been clicked or not.

    circleArray.push(new Circle(x, y, dx, dy, radius, boole));
  }
}

const highscoredis = document.querySelector("#highsc");
highscoredis.innerHTML = "BEST: " + highScore;

const currentdis = document.querySelector("#nowsc");
currentdis.innerHTML = "SCORE: " + score;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerh);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

function newGame() {
  var scorestr = localStorage.getItem(save_key_score);
  if (scorestr == null) highScore = 0;
  else highScore = parseInt(scorestr);
  createBub();
  animate();
}
newGame();
