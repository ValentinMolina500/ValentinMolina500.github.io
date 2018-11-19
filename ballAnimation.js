var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;    
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var hue = "#0095DD"

function randomColor() {
    var newColor = 'rgb(' + (Math.floor(Math.random() * 256)) 
    + ',' + (Math.floor(Math.random() * 256)) 
    + ',' + (Math.floor(Math.random() * 256)) + ')';
    return newColor;
}
function drawBall(hue) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = hue;
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(hue);
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        hue = randomColor();
        dx = -dx;
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        hue = randomColor();
        dy = -dy;
    }
    
    x += dx;
    y += dy;
}

setInterval(draw, 10);