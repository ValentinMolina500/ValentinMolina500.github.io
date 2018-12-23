var canvas = document.getElementById("myCanvas");
/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext("2d");

// initial variables
var mainSquare;
var myEnemies = [];
const distances = [295, 265, 235, 205, 175, 145, 115, 85, 55, 25];
const mainSquareImage = document.getElementById("source");
const enemyImage = document.getElementById("enemy");
const buttonImage = document.getElementById("button");
var myUpBtn;
var myDownBtn;
var myLeftBtn;
var myRightBtn;
var myMusic;

function startGame() {
    mainSquare = new component(32, 32, 240, 180, mainSquareImage);
    myUpBtn = new component(32, 32, 380, 210, buttonImage);
    myDownBtn = new component(32, 32, 380, 270, buttonImage);
    myLeftBtn = new component(32, 32, 350, 240, buttonImage);
    myRightBtn = new component(32, 32, 410, 240, buttonImage);
    myMusic = new sound("assets/audio/mainTheme.mp3");
    myMusic.play();
    myGameArea.start();
}

class sound {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }
    play() {
        this.sound.play();
    }
    stop() {
        this.sound.pause();
    }
}
var myGameArea = {
    start: function() {
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('mousedown', function (e) {
            e.preventDefault();
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
        })
        window.addEventListener('mouseup', function (e) {
            e.preventDefault();
            myGameArea.x = false;
            myGameArea.y = false;
        })
        window.addEventListener('touchstart', function (e) {
            e.preventDefault();
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
            myGameArea.x = e.touches[0].pageX;
            myGameArea.y = e.touches[0].pageY;
        })
        window.addEventListener('touchend', function (e) {
            myGameArea.x = false;
            myGameArea.y = false;
        })
        window.addEventListener("touchmove", function (e) {
            e.preventDefault();
            myGameArea.x = e.touches[0].pageX;
            myGameArea.y = e.touches[0].pageY;
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
    clicked() {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var clicked = true;
        if ((mybottom < myGameArea.y) || (mytop > myGameArea.y) ||
            (myright < myGameArea.x) || (myleft > myGameArea.x)) {
            clicked = false;
        }
        return clicked;
    }
}

function updateGameArea() {
    var x, y;
    if(myGameArea.x && myGameArea.y) {
        if(myUpBtn.clicked()) {
            console.log("here");
            mainSquare.y += -2;
        }
        if (myDownBtn.clicked()) {
            mainSquare.y += 2;
        }
        if (myLeftBtn.clicked()) {
            mainSquare.x += -2;
        }
        if (myRightBtn.clicked()) {
            mainSquare.x += 2;
        }
    }
    for (i = 0; i < myEnemies.length; i++)
    {
        if (mainSquare.collision(myEnemies[i])) {
            myGameArea.stop();
            return;
        }
    }
    myGameArea.clear();
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
    myUpBtn.update();
    myDownBtn.update();
    myLeftBtn.update();
    myRightBtn.update();
    mainSquare.newPos();
    mainSquare.update();
}

function everyInterval(n) {
    if((myGameArea.frameNo / n ) % 1 == 0)
        return true;
    return false;
}

//startGame();