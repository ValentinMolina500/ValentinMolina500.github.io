class hero {
    constructor() {
        this.x = canvas.clientWidth / 2 - 12;
        this.y = canvas.clientHeight / 2 -12;
        this.width = 25;
        this.height = 25;
        this.color = "#74b9ff"
    }
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
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
        //this.y = Math.floor(Math.random() * cHeight);
        //this.y = distances[Math.floor(Math.random() * distances.length)]
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
