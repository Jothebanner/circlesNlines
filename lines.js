var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var circles = [];

function Circle(xPos, yPos, xSpeed, ySpeed) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed

  this.counter = 0;
}

Circle.prototype.destroy = function () {
  
}

Circle.prototype.update = function () {

  ctx.strokeStyle = '#F8F8F8';
  ctx.fillStyle = "#F5F5F5";
  ctx.beginPath();
  ctx.arc(
    this.xPos += this.xSpeed,
    this.yPos += this.ySpeed,
    2, 
    0, 
    Math.PI * 2
         );
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

function CreateCircles() {
  for(var i=0;i<100;i++){
    var randomX = Math.floor(Math.random()*(500)+1);
    var randomY = Math.floor(Math.random()*(500)+1);
    var totalSpeed = Math.random(1) * 1;
    var xSpeed = 1 - totalSpeed;
    var ySpeed = totalSpeed;

    if (Math.random(1) < 0.5) {
      xSpeed *= -1;
    }
    if (Math.random(1) < 0.5) {
      ySpeed *= -1;
    }

    var circle = new Circle(randomX, randomY, xSpeed, ySpeed)
    circles.push(circle);
  }
  drawAndUpdate();
}
CreateCircles();

function drawAndUpdate() {
  ctx.clearRect(0, 0, 500, 500);

  for (var i = 0; i < circles.length; i++) {

      var myCircle = circles[i];
      myCircle.update();
  }
   
  requestAnimationFrame(drawAndUpdate);
}

