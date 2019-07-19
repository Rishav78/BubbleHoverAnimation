(function () {
    let canvas = document.querySelector('canvas');
    let width = window.innerWidth - 3, height = window.innerHeight - 3;
    let noOfCircles = 800;
    let balls = [];
    let increaseRadiusInRange = 50;
    let mousex, mousey;
    let radius = 2;
    let bubbleSpeed = 3;
    let c = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    window.addEventListener('resize', () => {
        width = window.innerWidth - 3;
        height = window.innerHeight - 3
        canvas.width = width;
        canvas.height = height;
        init();
    })
    function randomColorGenerator() {
        return `rgba(${(Math.random()*100)%256},${(Math.random()*100)%256},${(Math.random()*100)%256},1)`;
    }
    function Ball(x, y, radius, speedX, speedY, color, increaseRadiusBy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
        this.dupRadius = radius;
        this.increaseRadiusBy = increaseRadiusBy
        this.draw = function() {
            c.beginPath();
            c.arc(this.x, this.y, this.dupRadius, 0, Math.PI*2, false);
            c.fillStyle = this.color;
            c.fill();
            // c.stroke();
        }
        this.update = function() {
            if(this.x + this.dupRadius> width || this.x <= this.dupRadius){
                this.speedX = (this.speedX + 1)%8;
                this.speedX = this.x + this.dupRadius > width ? -this.speedX : Math.abs(this.speedX);
                this.color = randomColorGenerator();
            }
            if(this.y  + this.dupRadius > height || this.y <= this.dupRadius){
                this.speedY = (this.speedY + 1)%8;
                this.color = randomColorGenerator();
                this.speedY = this.y  + this.dupRadius > height ? -this.speedY: Math.abs(this.speedY);
            }
            this.x = this.x + this.speedX;
            this.y = this.y + this.speedY;
            this.dupRadius = mousex && mousey && (mousey - this.y < increaseRadiusInRange && mousey - this.y > -increaseRadiusInRange) && (mousex - this.x < increaseRadiusInRange && mousex - this.x > -increaseRadiusInRange) && this.dupRadius <this.radius + this.radius*this.increaseRadiusBy ? this.dupRadius + bubbleSpeed : this.dupRadius !== this.radius  ? this.dupRadius - bubbleSpeed : this.dupRadius;
            this.draw();
        }
    }
    function animate(){
        requestAnimationFrame(animate);
        c.clearRect(0, 0, width, height);
        for(let i=0;i< balls.length;i++){
            balls[i].update();
        }
    }
    function init() {
        balls = [];
        for(let i=0;i<noOfCircles;i++){
            let x = Math.floor(Math.random()*width - radius) + 10;
            let y = Math.floor(Math.random()*height - radius) + 10;
            let color = randomColorGenerator();
            let increaseRadiusBy = Math.random()*50;
            let speedX = Math.floor((Math.random()*10))%7 + 1;
            let speedY = Math.floor((Math.random()*10))%7 + 2;
            balls.push(new Ball(x,y,radius,speedX,speedY,color, increaseRadiusBy));
        }
    }
    window.addEventListener('mousemove', (e) => {
        mousex = e.x;
        mousey = e.y;
    })
    animate();
    init();
    })()