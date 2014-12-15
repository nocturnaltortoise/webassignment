function Player(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

//draws a rectangle for the player.
Player.prototype.draw = function(context) {
	context.beginPath();
	context.fillStyle = "#FF0000";
	context.rect(this.x,this.y,this.width,this.height);
	context.fill();
	context.closePath();
};

Player.prototype.getX = function() {
	return this.x;
};

Player.prototype.getY = function() {
	return this.y;
};

Player.prototype.getWidth = function() {
	return this.width;
};

Player.prototype.getHeight = function() {
	return this.height;
};

Player.prototype.setX = function(x) {
	this.x = x;
};

Player.prototype.setY = function(y) {
	this.y = y;
};

Player.prototype.setWidth = function(width) {
	this.width = width;
};

Player.prototype.setHeight = function(height) {
	this.height = height;
};
