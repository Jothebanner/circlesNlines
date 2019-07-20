var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.width = c.innerWidth;
ctx.height = c.innerHeight;
alert("w:" + ctx.width + " h:" + ctx.height);

var circles = [];

function distance(circle1, circle2) {
  var x = circle1.xPos - circle2.xPos;

  var y = circle1.yPos - circle2.yPos;

  return Math.sqrt(x*x + y*y);
}

function Circle(xPos, yPos, xSpeed, ySpeed) 
{
  this.xPos = xPos;
  this.yPos = yPos;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed

  this.counter = 0;
}

update = function () {
  for (a = 0; a < circles.length; a++)
  {
    circleX = circles[a].xPos;
    circleY = circles[a].yPos;
    if (circleX < 0 || circleX > ctx.width || circleY < 0 || circleY > ctx.height)
    {
      circles.splice(a, 1);
    }
  }
}

function draw()
{
  for (var i = 0; i < circles.length; i++) 
  {
    circle1 = circles[i];
    ctx.strokeStyle = '#F8F8F8';
    ctx.fillStyle = "#F5F5F5";
    ctx.beginPath();
    ctx.arc(
      circle1.xPos += circle1.xSpeed,
      circle1.yPos += circle1.ySpeed,
      2, 
      0, 
      Math.PI * 2
          );
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    
    for (v = 0;v < circles.length; v++) 
    {
      circle2 = circles[v];
      if (distance(circle1, circle2) < 100) 
      {
        ctx.beginPath();
        ctx.moveTo(circle1.xPos, circle1.yPos);
        ctx.lineTo(circle2.xPos, circle2.yPos);
      }
      
    ctx.lineWidth = 0.05;
    ctx.strokeStyle = 'white';
    ctx.stroke()
    };
  };
};

function CreateCircles() 
{
  for(var i=0;i<100;i++)
  {
    var randomX = Math.floor(Math.random()*(500)+1);
    var randomY = Math.floor(Math.random()*(500)+1);
    var totalSpeed = Math.random(1);
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

function drawAndUpdate() 
{
  ctx.clearRect(0, 0, ctx.width, ctx.height); 

  update();
  draw();
   
  requestAnimationFrame(drawAndUpdate);
}