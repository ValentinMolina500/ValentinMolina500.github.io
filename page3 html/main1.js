var canvas = document.getElementById("myCanvas");
/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext("2d");
var spacePressed = false;
var spaceUp = false;
var condition = false;
var cHeight = canvas.clientHeight;
var cWidth = canvas.clientWidth;
var squaredx = 1;
var enemydx = 2;
const baseImage = document.getElementById("source");
const time = new Date();
const currentTime = time.getSeconds();
const interval = 1;

var timing = [];
for(var p = 0; p < Math.floor(60 / interval);  p++)
{
    timing.push({time: 0 + (interval * p), taken: false});
}

const distances = [295, 265, 235, 205, 175, 145, 115, 85, 55, 25];

class hero {
    constructor() {
        this.x = canvas.clientWidth / 2 - 16;
        this.y = canvas.clientHeight / 2 -16;
        this.width = 32;
        this.height = 32;
        this.color = "#74b9ff"
    }
    draw() {
        ctx.drawImage(baseImage, this.x, this.y);
    }
    update() {
        this.y += squaredx;

        if(this.y > cHeight - this.height
            || this.y < 0)
            squaredx = -squaredx;
        }
}

class enemy {
    constructor(y) {
        this.x = 0 - 50;
        this.y = y;
        this.width = 50;
        this.height = 25;
        this.color = "red"
    }
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width,
            this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.x += enemydx;
    }
}

let square = new hero();
var enemies = [];

function distanceFrom(x1, y1, x2, y2) {
    xDistance = x2 - x1;
    yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function timer () {
    var d = new Date();
    var timedif = Math.abs(d.getSeconds() - currentTime);
    console.log(timedif);

    if(timedif % interval == 0 || timedif == 0)
    {
        for(var i = 0;  i <  timing.length; i++)
        {
            if(timing[i].time === timedif && !timing[i].taken && timedif != 0)
                {
                    if(timedif == 60 - interval)
                        timing[0].taken = false;

                    timing[i].taken = true;
                    return true;
                }
            if(timedif % 60 == 0 && timing[0].taken == false)
            {
                timing[0] = true;
                for(var j = 1;  j < timing.length; j++)
                {
                    timing[i].taken = false;
                }
                console.log(timing[0]);
                return true;
            }
        }
    }
}
function spawnEnemies() {
    let random;
    if(timer()) {
        random = Math.floor(Math.random() * distances.length);
        let enemy1 = new enemy(distances[random]);
        enemies.push(enemy1);
        //}
    }
}
function keyDownHandler(e) {
    if(e.keyCode == 32) {
        spacePressed = true;
        spaceUp = false;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 32) {
        spacePressed = false;
        spaceUp = true;
        squaredx = -squaredx;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    if(!condition) {
        ctx.font = "30px Arial";
        ctx.fillText("Welcome to my game", (cWidth / 2) - 120, cHeight / 2);
        ctx.fillText("I hope you enjoy it",  (cWidth / 2) - 120, (cHeight / 2) + 30);
        ctx.fillText(":) :) :) :) :) :)",  (cWidth / 2) - 120, (cHeight / 2) + 60);
        ctx.fillText("Press space you dummy", (cWidth / 2) - 120, (cHeight / 2) + 90);
        if(spaceUp)
        {
            condition = true;
        }
    }
    if(condition) {
        square.draw();
        square.update();
        spawnEnemies()

        for(var i = 0; i < enemies.length; i++)
        {
            enemies[i].draw();
            enemies[i].update();

            if(distanceFrom(square.x, square.y, enemies[i].x, enemies[i].y) < enemies[i].width/2 +
            square.width || enemies[i].x > cWidth + enemies[i].width) {
                enemies.splice(i, 1);
            }
        }
    }
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

setInterval(draw, 10);
