var canvas = document.getElementById("myCanvas");
/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext("2d");
var output = document.getElementById("output");
document.addEventListener("touchstart", touchHandler);
document.addEventListener("touchmove", touchHandler);

var mainSquare;
var myEnemies = [];
const distances = [295, 265, 235, 205, 175, 145, 115, 85, 55, 25];
var mainSquareImage = document.getElementById("source");
var enemyImage = document.getElementById("enemy");

function startGame() {
    mainSquare = new component(32, 32, 10, 120, mainSquareImage);
    myGameArea.start();
}

var myGameArea = {
    start: function() {
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('touchmove', function (e) {
            myGameArea.x = e.touches[0].screenX;
            myGameArea.y = e.touches[0].screenY;
        })
        },
    clear: function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        },
    stop: function() {
        clearInterval(this.interval);
    }
}

class component {
    constructor(width, height, x, y, image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
        this.speedX = 0;
        this.speedY = 0;
    }
    update() {
        ctx.drawImage(this.image, this.x, this.y);
    }
    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    collision(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, y;
    for (i = 0; i < myEnemies.length; i++)
    {
        if (mainSquare.collision(myEnemies[i])) {
            myGameArea.stop();
            return;
        }
    }
    myGameArea.clear();
    if (myGameArea.x && myGameArea.y)
    {
        mainSquare.x = myGameArea.x
        mainSquare.y = myGameArea.y
    }
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyInterval(50)) {
        x = 0;
        y = distances[Math.floor(Math.random() * distances.length)];
        myEnemies.push(new component(50, 25, x, y, enemyImage));
    }
    for (i = 0; i < myEnemies.length; i++)
    {
        myEnemies[i].x += 1;
        myEnemies[i].update();
    }
    console.log(myGameArea.frameNo);
    mainSquare.newPos();
    mainSquare.update();
}

function everyInterval(n) {
    if((myGameArea.frameNo / n ) % 1 == 0)
        return true;
    return false;
}

function touchHandler(e) {
    if(e.touches) {
        mainSquare.x = e.touches[0].pageX - canvas.offsetLeft - mainSquare.width / 2;
        mainSquare.y = e.touches[0].pageY - canvas.offsetTop - mainSquare.height / 2;
        output.innerHTML = "Touch: "+ " x: " + mainSquare.x + ", y: " + mainSquare.y;
        e.preventDefault();
    }
}

startGame();