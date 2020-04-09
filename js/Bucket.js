function Bucket(x, y, width, height) {
	this.x = x; 
	this.y = y; 
	this.width = width;
	this.height = height;
};

Bucket.prototype.moveTo = function(x, y) {
	this.x = x;
	this.y = y;
	
	if (this.x < 0) {
		this.x = 0;
	}
	else if (this.x > (canvas.width - this.width)) {
		this.x = canvas.width - this.width;
	}
}

Bucket.prototype.draw = function() {
	console.log(this);
	var bucket = new Image();
	bucket.src = 'images/rabbit.png';
	ctx.drawImage(bucket, this.x, this.y, this.width, this.height);
}