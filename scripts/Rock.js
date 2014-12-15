function Rock(x,y,radius,speed){
	this.x = x;
	this.y = y;
	this.radius = radius;
	//speed in a downwards direction - no point to having dx and dy as the rocks only go down.
	this.speed = speed;
}

//draws a circle for each rock.
Rock.prototype.draw = function(context){
	context.beginPath();
	context.fillStyle = "#ccc";
	context.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
	context.fill();
	context.closePath();
};

Rock.prototype.getX = function(){
	return this.x;
};

Rock.prototype.getY = function(){
	return this.y;
};

Rock.prototype.getRadius = function(){
	return this.radius;
};

Rock.prototype.getSpeed = function(){
	return this.speed;
};

Rock.prototype.setX = function(x){
	this.x = x;
};

Rock.prototype.setY = function(y){
	this.y = y;
};

Rock.prototype.setRadius = function(radius){
	this.radius = radius;
};

Rock.prototype.setSpeed = function(speed){
	this.speed = speed;
};

