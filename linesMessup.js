var c = document.getElementById("myCanvas"),
numOfCircles = 100;
mouse = {
  x: 0,
  y: 0
};  // mouse location

// if the width and height are set with css then everything streches
// so setting it again makes it utilize canvas's grid system
// https://stackoverflow.com/questions/2588181/canvas-is-stretched-when-using-css-but-normal-with-width-height-properties
c.width = document.getElementById("myCanvas").clientWidth;
c.height = document.getElementById("myCanvas").clientHeight;

var ctx = c.getContext("2d");
// set context width and height
ctx.width = document.getElementById("myCanvas").clientWidth;
ctx.height = document.getElementById("myCanvas").clientHeight;
// alert("w:" + ctx.width + " h:" + ctx.height);

// array to hold all of the cirle objects in
var circles = [];

function distance(point1, point2) {
  var x = point1.x - point2.x;

  var y = point1.y - point2.y;

  return (x*x + y*y);
}

function Circle(x, y, xSpeed, ySpeed) 
{
  this.x = x;
  this.y = y;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed

  this.counter = 0;
}

function update() {
  for (a = 0; a < circles.length; a++)
  {
    circleX = circles[a].x;
    circleY = circles[a].y;
    if (circleX < 0 || circleX > ctx.width || circleY < 0 || circleY > ctx.height)
    {
      circles.splice(a, 1);
      if (Math.random() < 0.5) {
        if (Math.random() < 0.5) {
          var randomX = Math.floor(Math.random()*(ctx.width)+1);
          var randomY = 1;
        } 
        else {
          var randomX = Math.floor(Math.random()*(ctx.width)+1);
          var randomY = -1;
        }
      }
      else {
        if (Math.random() < 0.5) {
          var randomY = Math.floor(Math.random()*(ctx.height)+1);
          var randomX = 1;
        }
        else {
          var randomY = Math.floor(Math.random()*(ctx.height)+1);
          var randomX = -1;
        }
      }
      var totalSpeed = Math.random(1);
      var xSpeed = 1 - totalSpeed;
      var ySpeed = totalSpeed;

      if (randomX == -1 || Math.random(1) < 0.5 && randomX != 1) {
        xSpeed *= -1;
      }
      if (randomY == -1 || Math.random(1) < 0.5 && randomY != 1) {
        ySpeed *= -1;
      }

      var circle = new Circle(randomX, randomY, xSpeed, ySpeed)
      circles.push(circle);
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
      circle1.x += circle1.xSpeed,
      circle1.y += circle1.ySpeed,
      4, 
      0, 
      Math.PI * 2
          );
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    
    if (distance(mouse, circle1) < 50000) {
      ctx.beginPath();
      ctx.moveTo(circle1.x, circle1.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.lineWidth = 0.01;
      ctx.strokeStyle = 'white';
      ctx.stroke()
    }
    
    for (v = 0;v < circles.length; v++) 
    {
      circle2 = circles[v];
      if (distance(circle1, circle2) < 50000) 
      {
        ctx.beginPath();
        ctx.moveTo(circle1.x, circle1.y);
        ctx.lineTo(circle2.x, circle2.y);
      }
      
    ctx.lineWidth = 0.01;
    ctx.strokeStyle = 'white';
    ctx.stroke()
    };
  };
};

function CreateCircles() 
{
  for(var i=0;i<numOfCircles;i++)
  {
    var randomX = Math.floor(Math.random()*(ctx.width)+1);
    var randomY = Math.floor(Math.random()*(ctx.height)+1);
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
c.addEventListener('mousemove', function(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});