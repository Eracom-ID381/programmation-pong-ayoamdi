let scoreLeft = 0;
let scoreRight = 0;

let ball = {
    x: 0,
    y: 0,
    speedX: 10,
    speedY: 0,
    radius: 40
}

// let paddleLeft = {
//     x: 30,
//     y: 0,
//     width: 20,
//     height: 150
// }
//
// let paddleRight = {
//     x: 0,
//     y: 0,
//     width: 20,
//     height: 150
// }

let paddles = [];
let paddleLeft;
let paddleRight;

let balls = [];




function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    noStroke();

    paddleRight = new Paddle(width - 30, 0, 20, random(50, 200), 'vertical'); //right
    paddleLeft = new Paddle(30, 0, 20, random(50, 200), 'horizontal'); //left

    paddles.push(paddleRight); //pousse les variables dans le tableau paddles
    paddles.push(paddleLeft); //pousse les variables dans le tableau paddles

    for (let i = 0; i < 1; i += 1) {
        balls[i] = new Ball(width / 2, height / 2, 30, 10, 0);
    }
}

function draw() {
    background(0);
    fill(255);
    drawElements();
    for (let i = 0; i < paddles.length; i += 1) {
        paddles[i].afficher();
        paddles[i].bouger();
    }

    for (let i = 0; i < balls.length; i += 1) {
        balls[i].afficher();
        balls[i].bouger();
        balls[i].rebondir();
        balls[i].score();
    }
}

function drawElements() {
    ellipse(ball.x, ball.y, ball.radius);
    textSize(100);
    textAlign(RIGHT)
    text(scoreLeft, width / 2 - 40, 100);
    textAlign(LEFT)

    text(scoreRight, width / 2 + 40, 100);

    for (let y = 0; y < height; y = y + 30) {
        rect(width / 2, y, 20, 20);
    }
}


class Paddle {
    constructor(x, y, width, height, axis) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.axis = axis;
    }
    afficher() {
        // if (scoreLeft && scoreRight == 1) {
        rect(this.x, this.y, this.width, this.height);
        // }
    }

    bouger() {
        if (this.axis == 'vertical') {
            this.y = mouseY;
        } else if (this.axis == 'horizontal') {
            this.y = mouseX;
        }
    }

}

function addBall() {
    balls.push(new Ball(width / 2, height / 2, random(-30, 30), 10, 0));
}

class Ball {
    constructor(_x, _y, _radius, _speedX, _speedY) {
        this.x = _x;
        this.y = _y;
        this.radius = _radius;
        this.speedX = _speedX;
        this.speedY = _speedY;
        this.distances = [];
        this.enabled = true;
        this.col = color(255, 255, 255);
    }

    afficher() {
        fill(this.col);
        ellipse(this.x, this.y, this.radius);
    }
    bouger() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    rebondir() {
        // Check for bounce against paddles
        for (let i = 0; i < paddles.length; i += 1) {
            if (this.x + this.radius / 2 > paddles[i].x &&
                this.x - this.radius / 2 < paddles[i].x + paddles[i].width &&
                this.y > paddles[i].y && this.y < paddles[i].y + paddles[i].height) {
                // addBall();
                this.speedX = -this.speedX;
                this.speedY = random(-5, 5);

            }
        }

        // Check for bounce against edges
        if (this.y > height - this.radius / 2 || this.y < 0 + this.radius / 2) {
            this.speedY = -this.speedY;
        }
    }

    score() {
        if (this.enabled && this.x < 0) {
            scoreRight += 1;
            addBall();
            this.enabled = false;
        } else if (this.enabled && this.x > width) {
            scoreLeft += 1;
            addBall();
            this.enabled = false;
        }
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    setup();
}