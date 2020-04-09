function Enemy(x, y, width, height, speed, captured) {
	this.x = x; 
	this.y = y; 
	this.width = width;
	this.height = height;
	
	//The speed of Enemy when falling
	this.speed = speed;
	
	//Tells if Enemy has been captured (bool)
	this.captured = captured;
	this.type = 'enemy';
}

Enemy.prototype.fall = function() {
	this.y += this.speed;
}

Enemy.prototype.draw = function() {
	var img = new Image();
	img.src = 'images/ovo.png';
	ctx.drawImage(img, this.x, this.y, this.width, this.height);
}