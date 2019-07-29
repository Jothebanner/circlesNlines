var c = document.getElementById("myCanvas"),
ctx = c.getContext("2d"),
numOfCircles = 100;
mouse = {
  x: 0,
  y: 0
};  // mouse location

window.onresize = changeToGrid;

// if the width and height are set with css then everything streches
// so setting it again makes it utilize canvas's grid system
// https://stackoverflow.com/questions/2588181/canvas-is-stretched-when-using-css-but-normal-with-width-height-properties
function changeToGrid() 
{
c.width = document.getElementById("myCanvas").clientWidth;
c.height = document.getElementById("myCanvas").clientHeight;

// set context width and height
// alert("w:" + ctx.width + " h:" + ctx.height);
ctx.width = document.getElementById("myCanvas").clientWidth;
ctx.height = document.getElementById("myCanvas").clientHeight;
}
changeToGrid();


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
  this.ySpeed = ySpeed;
}

function update() 
{
  for (a = 0; a < circles.length; a++)
  {
    circleX = circles[a].x;
    circleY = circles[a].y;
    if (circleX < 0 -100 || circleX > ctx.width + 100 || circleY < 0 - 100 || circleY > ctx.height + 100)
    {
      circles.splice(a, 1);
    }
    while (circles.length < numOfCircles) 
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

      // Attempt to spawn at the edges rather than a random place in the middle.
      // the dots slowly disappear forever and it's not worth the time to debug

      // var totalSpeed = Math.random(1);
      // var xSpeed = 1 - totalSpeed;
      // var ySpeed = totalSpeed;
      
      // if (Math.random() < 0.5) {
      //   if (Math.random() < 0.5) {
      //     var randomX = Math.random()*(ctx.width)+1;
      //     var randomY = 1;
      //     ySpeed *= 1;
      //   }
      //   else 
      //   {
      //     var randomX = Math.random()*(ctx.width)+1;
      //     var randomY = ctx.height;
      //     ySpeed *= -1;
      //   }
      // }
      // else {  
      //   if (Math.random() < 0.5) {
      //     if (Math.random() < 0.5) {
      //       var randomY = Math.random()*(ctx.height)+1;
      //       var randomX = 1;
      //       xSpeed *= 1;
      //     }
      //     else
      //     {
      //       var randomY = Math.random()*(ctx.height)+1;
      //       var randomX = ctx.width;
      //       xSpeed *= -1;
      //     }
      //   }
      // }

      // var circle = new Circle(randomX, randomY, xSpeed, ySpeed)
      // circles.push(circle);
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
      5, 
      0, 
      Math.PI * 2
          );
    ctx.fill();
    ctx.lineWidth = 0;
    var m2c = distance(mouse, circle1);
    if (m2c < 50000) {
      ctx.beginPath();
      ctx.moveTo(circle1.x, circle1.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.lineWidth = (50000 - m2c) * 4 / 100000;
      ctx.stroke();
    }
    
    for (v = 0;v < circles.length; v++) 
    {
      circle2 = circles[v];
      var c2c = distance(circle1, circle2);
      if (c2c < 50000) 
      {
        ctx.beginPath();
        ctx.moveTo(circle1.x, circle1.y);
        ctx.lineTo(circle2.x, circle2.y);
        ctx.lineWidth = (50000 - c2c) * 2 / 100000;
        ctx.stroke();
      }
    }
  }
}

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
  document.getElementById("debug").innerHTML = mouse.x + " " + mouse.y + " " + circles.length;
});
