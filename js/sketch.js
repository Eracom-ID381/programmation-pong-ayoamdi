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

let h = 255;


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    noStroke();

    paddleRight = new Paddle(width - 50, 0, 80, 'vertical', true); //right


    paddleLeft = new Paddle(50, 0, 80, 'horizontal', true); //left

    paddles.push(paddleRight); //pousse les variables dans le tableau paddles
    paddles.push(paddleLeft); //pousse les variables dans le tableau paddles



    for (let i = 0; i < 1; i += 1) {
        balls[i] = new Ball(width / 2, height / 2, 30, 10, 0);
    }

    colorMode(HSB, 255);
}

function draw() {
    colorMode(HSB, 255);
    background(h, 200, 250);
    fill(255, 255, 0);
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

    // if (balls.rebondir == true) {
    //     h = h + 20;
    // }

    // if (scoreRight += 1) {
    //     paddleRight = new Paddle(width - 30, 0, 20, random(50, 200), 'vertical', true); //right
    // }
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
    constructor(x, y, radius, axis, isActive) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.axis = axis;
    }
    afficher() {

        ellipse(this.x, this.y, this.radius, this.radius);


        // if (scoreLeft > 5) {
        //     rect(this.x, this.y, this.width, this.height + 80);
        // }
        //
        // if (scoreRight > 5) {
        //     rect(this.x, this.y, this.width, this.height + 80);
        // }
    }

    bouger() {
        if (this.axis == 'vertical') {
            this.y = mouseY;
        } else if (this.axis == 'horizontal') {
            this.y = mouseX;
        }

        // if (scoreRight > 10 && this.axis == 'horizontal') {
        //     this.y = mouseY;
        // }
        // if (scoreLeft > 10 && this.axis == 'vertical') {
        //     this.y = mouseX;
        // }
    }

}

function addPaddleLeft() {
    paddles.push(new Paddle(width - 30, 0, random(50, 200), 'horizontal', true))
}

function addBall() {
    balls.push(new Ball(width / 2, height / 2, random(15, 30), random(10, -10), random(10, -10)));
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

    }

    afficher() {
        fill(255, 255, 255);
        ellipse(this.x, this.y, this.radius);
    }
    bouger() {
        this.x += this.speedX;
        this.y += this.speedY;

        // if (scoreLeft | scoreRight > 8) {
        //     this.x += this.speedX + 10;
        //     this.y += this.speedY + 10;
        // }

    }
    rebondir() {
        // Check for bounce against paddles
        for (let i = 0; i < paddles.length; i += 1) {
            if (this.x + this.radius / 2 > paddles[i].x &&
                this.x - this.radius / 2 < paddles[i].x + paddles[i].radius / 2 &&
                this.y > paddles[i].y && this.y < paddles[i].y + paddles[i].radius / 2) {
                // addBall();
                this.speedX = -this.speedX;
                this.speedY = random(-5, 5);
                // h = h + 30;

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
            paddleRight = new Paddle(width - 30, 0, random(50, 200), random(50, 200), 'vertical', true);
            addBall();
            //addPaddleLeft();

            this.enabled = false;

        } else if (this.enabled && this.x > width) {
            scoreLeft += 1;
            paddleLeft = new Paddle(width - 30, 0, random(50, 200), random(50, 200), 'horizontal', true);
            addBall();

            this.enabled = false;

        }




    }

}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    setup();
}