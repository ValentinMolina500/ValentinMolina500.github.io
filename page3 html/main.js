var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

// initial variables
var mainSquare;
var myEnemies = [];
//var myEnemiesUp = [];
const distancesX = [480, 450, 420, 390, 360, 330, 300, 270, 240, 210, 180, 150,
    120, 90, 60, 30]
const distances = [295, 265, 235, 205, 175, 145, 115, 85, 55, 25];
const mainSquareImage = document.getElementById("source");
const enemyImage = document.getElementById("enemy");
const buttonImage = document.getElementById("button");
const enemyUpImage = document.getElementById("enemyUp");
var myUpBtn;
var myDownBtn;
var myLeftBtn;
var myRightBtn;
var myMusic;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

function startGame() {
    mainSquare = new component(32, 32, canvas.width/2,
        canvas.height/2, mainSquareImage);
    myUpBtn = new component(32, 32, 380, 210, buttonImage);
    myDownBtn = new component(32, 32, 380, 270, buttonImage);
    myLeftBtn = new component(32, 32, 350, 240, buttonImage);
    myRightBtn = new component(32, 32, 410, 240, buttonImage);
    //myMusic = new sound("assets/audio/mainTheme.mp3");
    //myMusic.play();
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
        this.score = 0;
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
        window.addEventListener("keydown", e => {
            if(e.keyCode == 68)
                rightPressed = true;
            else if(e.keyCode == 65)
                leftPressed = true;
            else if(e.keyCode == 87)
                upPressed = true;
            else if(e.keyCode == 83)
                downPressed = true;
        })
        window.addEventListener("keyup", e => {
            if(e.keyCode == 68)
                rightPressed = false;
            else if(e.keyCode == 65)
                leftPressed = false;
            else if(e.keyCode == 87)
                upPressed = false;
            else if(e.keyCode == 83)
                downPressed = false;
        })
        },
    clear: function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        },
    stop: function() {
        clearInterval(this.interval);
    },
    scoreUpdate: function() {
        ctx.font = "30px Comic Sans MS";
        ctx.fillText("score: " + this.score, 330, 50);
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

    // canvas on screen button implementation
    if(myGameArea.x && myGameArea.y) {
        if(myUpBtn.clicked()) {
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

    // WASD movement implementation
    if(rightPressed && mainSquare.x + 3 < canvas.width - mainSquare.width) {
        mainSquare.x += 3;
    }
    else if(leftPressed && mainSquare.x -3 > -3) {
        mainSquare.x += -3;
    }
    else if(upPressed && mainSquare.y - 3 > -3) {
        mainSquare.y += -3;
    }
    else if(downPressed && mainSquare.y + 3 < canvas.height - mainSquare.height + 3) {
        mainSquare.y += 3;
    }

    // frame and clear
    myGameArea.clear();
    myGameArea.frameNo += 1;

    // spawning horizontal mobs
    if (myGameArea.frameNo == 1 || everyInterval(30)) {
        x = canvas.width + 50;
        y = distances[Math.floor(Math.random() * distances.length)];
        myEnemies.push(new component(50, 25, x, y, enemyImage));
    }

    // spawning vertical mobs
    if (everyInterval(30)) {
        x = distancesX[Math.floor(Math.random() * distancesX.length)];
        y = canvas.height + 50;
        myEnemies.push(new component(25, 50, x, y, enemyUpImage));
    }
    console.log(myEnemies.length);
    // updating score
    if (everyInterval(45)) {
        myGameArea.score++;
    }
    // updating movement for enemies
    for (i = 0; i < myEnemies.length; i++)
    {
        if(myEnemies[i].x > canvas.width + myEnemies[i].width || (myEnemies[i].y < 0 - myEnemies[i].height && myEnemies[i].x > 0)) {
            myEnemies.splice(i, 1);
        }
        if(myEnemies[i].width == 50) {
            myEnemies[i].x += -7;
            myEnemies[i].update();
        }
        if(myEnemies[i].width == 25) {
            myEnemies[i].y += -7    ;
            myEnemies[i].update();
        }
        if (mainSquare.collision(myEnemies[i])) {
            myGameArea.stop();
            //return;
        }
    }

    // hero and button updates
    /*myUpBtn.update();
    myDownBtn.update();
    myLeftBtn.update();
    myRightBtn.update();*/
    mainSquare.newPos();
    mainSquare.update();
    myGameArea.scoreUpdate();
}

// logic
function everyInterval(n) {
    if((myGameArea.frameNo / n ) % 1 == 0)
        return true;
    return false;
}

//startGame();