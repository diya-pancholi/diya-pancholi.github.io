var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;
var innerh = window.innerHeight - 100;
var c = canvas.getContext("2d");

var scorefo = 0;
const save_key_score_fo = "highscorefo";
var highScorefo = localStorage.getItem(save_key_score_fo);

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
      scorefo++;
      const currentdisfo = document.querySelector("#nowscfo");
      currentdisfo.innerHTML = "SCORE: " + scorefo;
    }
    if (highScorefo < scorefo) {
      highScorefo = scorefo;
      localStorage.setItem(save_key_score_fo, highScorefo);
    }
    console.log(scorefo);
  });
});

var colorArray = [
  "#01261ca6",
  "#36593ea6",
  "#4d7343a6",
  "#78a658a6",
  "#a9d962a6",
];
class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dx;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * 5)];
  }

  draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "rgb(136, 100, 10)";
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

/*
 */
let circleArray = [];

function createbubfo() {
  for (let i = 0; i < 100; i++) {
    let radius = 50 - Math.random() * 20;
    let x = innerWidth / 2 + (Math.random() - 0.5) * 100;
    let y = innerh / 2 + (Math.random() - 0.5) * 100;
    let dx = (Math.random() - 0.5) * 20;
    let dy = (Math.random() - 0.5) * 20;

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}
const highscoredisfo = document.querySelector("#highscfo");
highscoredisfo.innerHTML = "BEST: " + highScorefo;

const currentdisfo = document.querySelector("#nowscfo");
currentdisfo.innerHTML = "SCORE: " + scorefo;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerh);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
function newGamefo() {
  var scorestrfo = localStorage.getItem(save_key_score_fo);
  if (scorestrfo == null) highScorefo = 0;
  else highScorefo = parseInt(scorestrfo);
  createbubfo();
  animate();
}

newGamefo();
