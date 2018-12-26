// DOM variables
var nodes = document.querySelectorAll("canvas");
var canvas = nodes[0];
var ctx = canvas.getContext('2d');
var secondCanvas = nodes[nodes.length - 1];
var ctx2 = secondCanvas.getContext('2d');
ctx2.font = "30px Comic Sans MS"

// modal :D
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var modalText = document.querySelector("p");
var modalImage = document.querySelector('img');
var myMusic = document.querySelector('audio');
var myMusic2 = document.getElementById('myAudio2');
myMusic.volume = "0.7";
myMusic2.volume = "0.7";
setTimeout(() => myMusic.play(), 1000);


// initial variables
var mainSquare;
var myEnemies = [];
//var myEnemiesUp = [];
const distancesX = [0, 46, 92, 138, 184, 230, 276, 322, 414]; //480
const distances =  [0, 46, 92, 138, 184, 230, 276];//y 320
var sqSpeed = 0;
var timeSince = 0;

// images
const mainSquareImage = document.getElementById("source");
const enemyImage = document.getElementById("enemy");
const buttonImage = document.getElementById("button");
const enemyUpImage = document.getElementById("enemyUp");
const speedUpImage = document.getElementById("speedUp");
const speedDownImage = document.getElementById("speedDown");
const invincibleImage = document.getElementById("invincible");

var myUpBtn;
var myDownBtn;
var myLeftBtn;
var myRightBtn;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spawnDiff = 0;
var mobSpeed = 0;

function startGame() {
    mainSquare = new component(32, 32, canvas.width/2,
        canvas.height/2, mainSquareImage);
    myUpBtn = new component(32, 32, 380, 210, buttonImage);
    myDownBtn = new component(32, 32, 380, 270, buttonImage);
    myLeftBtn = new component(32, 32, 350, 240, buttonImage);
    myRightBtn = new component(32, 32, 410, 240, buttonImage);
    myGameArea.start();
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
            e.preventDefault();
            myGameArea.x = false;
            myGameArea.y = false;
        })
        window.addEventListener("touchmove", function (e) {
            e.preventDefault();
            myGameArea.x = e.touches[0].pageX;
            myGameArea.y = e.touches[0].pageY;
        })
        window.addEventListener("keydown", e => {
            e.preventDefault();
            if(e.keyCode == 68 || e.keyCode == 39)
                rightPressed = true;
            else if(e.keyCode == 65 || e.keyCode == 37)
                leftPressed = true;
            else if(e.keyCode == 87 || e.keyCode == 38)
                upPressed = true;
            else if(e.keyCode == 83 || e.keyCode == 40)
                downPressed = true;
        })
        window.addEventListener("keyup", e => {
            e.preventDefault();
            if(e.keyCode == 68 || e.keyCode == 39)
                rightPressed = false;
            else if(e.keyCode == 65 || e.keyCode == 37)
                leftPressed = false;
            else if(e.keyCode == 87 || e.keyCode == 38)
                upPressed = false;
            else if(e.keyCode == 83 || e.keyCode == 40)
                downPressed = false;
        })
        },
    clear: function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx2.clearRect(0, 0, secondCanvas.width, secondCanvas.height);
        },
    stop: function() {
        clearInterval(this.interval);
    },
    scoreUpdate: function() {
        ctx.font = "30px Comic Sans MS";
        ctx.fillText("score: " + this.score, 310, 50);
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
        this.invincible = false;
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
    if(rightPressed && mainSquare.x + 3 + sqSpeed < canvas.width - mainSquare.width) {
        mainSquare.x += 3 + sqSpeed;
    }
    else if(leftPressed && mainSquare.x -3 - sqSpeed > -3) {
        mainSquare.x += -3 - sqSpeed;
    }
    else if(upPressed && mainSquare.y - 3 - sqSpeed > -3) {
        mainSquare.y += -3 - sqSpeed;
    }
    else if(downPressed && mainSquare.y + 3 + sqSpeed< canvas.height - mainSquare.height + 3) {
        mainSquare.y += 3 + sqSpeed;
    }

    // frame and clear
    myGameArea.clear();
    myGameArea.frameNo += 1;

    // spawning horizontal mobs
    if (myGameArea.frameNo == 1 || everyInterval(40 - spawnDiff)) {
        x = canvas.width + 50;
        y = distances[Math.floor(Math.random() * distances.length)];
        myEnemies.push(new component(50, 25, x, y, enemyImage));
    }

    // spawning vertical mobs
    if (everyInterval(40 - spawnDiff)) {
        x = distancesX[Math.floor(Math.random() * distancesX.length)];
        y = canvas.height + 50;
        myEnemies.push(new component(25, 50, x, y, enemyUpImage));
    }
    // spawing powerups
    if(everyInterval(550)) {
        x = canvas.width + 50;
        y = distances[Math.floor(Math.random() * distances.length)];
        myEnemies.push(new component(16, 16, x, y, speedUpImage));
    }
    if(everyInterval(750)) {
        x = canvas.width + 50;
        y = distances[Math.floor(Math.random() * distances.length)];
        myEnemies.push(new component(16, 16, x, y, speedDownImage));
    }
    if(everyInterval(1050) && !mainSquare.invincible ) {
        x = canvas.width + 50;
        y = distances[Math.floor(Math.random() * distances.length)];
        myEnemies.push(new component(16, 16, x, y, invincibleImage));
    }

    // updating score
    if (everyInterval(45)) {
        myGameArea.score++;
    }
    // updating movement for enemies
    for (i = 0; i < myEnemies.length; i++)
    {
        if(myEnemies[i].x > canvas.width + 50 || (myEnemies[i].y < 0 - myEnemies[i].height &&
            myEnemies[i].x > 0)) {
            myEnemies.splice(i, 1);
        }
        if (mainSquare.collision(myEnemies[i])) {
            if(myEnemies[i].image == speedUpImage) {
                if(sqSpeed < 2) {
                    sqSpeed++;
                }
                myEnemies.splice(i, 1);
            }
            else if(myEnemies[i].image == speedDownImage) {
                if(sqSpeed > -2) {
                    sqSpeed--;
                }
                myEnemies.splice(i, 1);
            }
            else if(myEnemies[i].image == invincibleImage) {
                mainSquare.invincible = true;
                timeSince = myGameArea.frameNo;
                myEnemies.splice(i, 1);
            }
            else if(!mainSquare.invincible){
                myGameArea.stop();
                myMusic.pause();
                myMusic2.pause();
                modal.style.display = "block";
                let emotion;
                let giphyAPI;
                span.onclick = () => {
                    modal.style.display = "none";
                    window.location = location;
                }
                window.onclick = (e) => {
                    if(e.target == modal)
                        modal.style.display = "none";
                        window.location = location;
                }
                if(myGameArea.score < 50) {
                    modalText.innerHTML = "You lose! Your score was " + myGameArea.score +
                    ". Looks like you need some practice. Click outside the modal to try again.";
                    emotion = "sad";
                    giphyAPI = "https://api.giphy.com/v1/gifs/random?tag=" +
                        emotion + "&api_key=FS7DZSLxVLnAPoHAIzv2sr3p9eo8HmOM";
                    fetch(giphyAPI)
                    .then(response => response.json())
                    .then(json => {
                        console.log(json);
                        modalImage.src = json.data.images['downsized'].url;
                    })
                    .catch(err => console.log(err));
                    }
                if(myGameArea.score >= 50 && myGameArea.score < 99) {
                    modalText.innerHTML = "You lose! Your score was " + myGameArea.score +
                ". Not bad. Click outside the modal to try again.";
                    emotion = "impressed";
                    giphyAPI = "https://api.giphy.com/v1/gifs/random?tag=" +
                        emotion + "&api_key=FS7DZSLxVLnAPoHAIzv2sr3p9eo8HmOM";
                    fetch(giphyAPI)
                    .then(response => response.json())
                    .then(json => {
                        console.log(json);
                        modalImage.src = json.data.images['downsized'].url;
                    })
                    .catch(err => console.log(err));
                }
                if(myGameArea.score >= 100 && myGameArea.score < 150) {
                    modalText.innerHTML = "You lose! Your score was " + myGameArea.score +
                    ". Wow, you're pretty good at this! Click outside the modal to try again.";
                    }
                if(myGameArea.score >= 150 && myGameArea.score < 199) {
                    modalText.innerHTML = "You lose! Your score was " + myGameArea.score +
                    ". Amazing, you're parents must be proud! Click outside the modal to try again.";
                    }
                if(myGameArea.score > 200) {
                    modalText.innerHTML = "You lose! Your score was " + myGameArea.score +
                    ". You are the Square Game Master! Click outside the modal to try again.";
                    }
                //modalImage.src = result.data.images['downsized'].url;
            }
        }
        if(myEnemies[i].width == 50 || myEnemies[i].width == 16) {
            myEnemies[i].x += -2 - mobSpeed;
            myEnemies[i].update();
        }
        if(myEnemies[i].width == 25) {
            myEnemies[i].y += -2 - mobSpeed;
            myEnemies[i].update();
        }
    }

    // hero and button updates
    /*myUpBtn.update();
    myDownBtn.update();
    myLeftBtn.update();
    myRightBtn.update();*/
    if(myGameArea.frameNo > timeSince + 300)
    {
        mainSquare.invincible = false;
    }

    // second canvas drawings
    ctx2.fillText("Speed: " +(sqSpeed + 3) + "/5", 0, secondCanvas.height/2);
    if(mainSquare.invincible) {
        ctx2.fillStyle = "yellow";
        ctx2.fillText("Invincible!", 180, secondCanvas.height/2);
        ctx2.fillStyle = "black";
    }
    if(myGameArea.score >= 50 && myGameArea.score < 100) {
        ctx2.fillText("Wow, you're good", 340, secondCanvas.height/2);
    }
    if(myGameArea.score >= 100){
        ctx2.fillText("Amazing!", 340, secondCanvas.height/2);
    }
    if(myGameArea.frameNo == 2250) {
        myMusic.pause();
        myMusic2.play();
        spawnDiff = 20;
        mobSpeed = 1;
    }

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



window.onload = () => {
    startGame();
}