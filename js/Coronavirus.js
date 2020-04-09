function Coronavirus(x, y, width, height, speed, captured) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    //The speed of Enemy when falling
    this.speed = speed;

    //Tells if Enemy has been captured (bool)
    this.captured = captured;
    this.type = 'corona';
}

Coronavirus.prototype.fall = function() {
    this.y += this.speed;
}

Coronavirus.prototype.draw = function() {
    var img = new Image();
    img.src = 'images/covid-19.png';
    ctx.drawImage(img, this.x, this.y, this.width, this.height);
}