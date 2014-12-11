var canvas;
var context;
var WIDTH = 640;
var HEIGHT = 480;
var interval;
var state = "menu";
var triangles = [];

function Triangle(x,y,height, baseWidth, spacing){
	this.x = x;
	this.y = y;
	this.height = height;
	this.baseWidth = baseWidth;
	this.spacing = spacing;
}

Triangle.prototype.draw = function(){
	context.beginPath();
	context.strokeStyle = "rgba(0,0,0,1.0)";
	context.lineWidth = "5";
	context.moveTo(this.x,this.y);
	context.lineTo(this.x+this.baseWidth/2, this.height);
	context.lineTo(this.baseWidth, this.y);
	context.moveTo(this.baseWidth + this.spacing, this.y);
	context.stroke();
	context.closePath();
};

function init(){
	canvas = $('#demoCanvas')[0]
	context = canvas.getContext("2d");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	update();
	interval = setInterval(render, 30);
}

function update(){

	for(var triangleCounter = 0; triangleCounter <= 10; triangleCounter++){
		triangles.push(new Triangle(Math.random()*WIDTH,0,Math.random()*5,Math.random()*10, 5));
	}

}

function render(){

	context.beginPath();

	switch(state){
		case "menu":
			context.fillStyle = "rgba(255,255,255,1.0)";
			// context.rect(0,0,WIDTH,HEIGHT);
			
			triangles.forEach(function(triangle){
				triangle.draw();
			});
			


			break;
		case "playing":
			context.fillStyle = "rgba(204,204,204,1.0)";
			context.rect(0,0,WIDTH,HEIGHT);
			context.fillStyle = "rgba(140,250,240,1.0)";
			context.rect(0,0,WIDTH, 50);
			context.rect(0,HEIGHT-10,WIDTH,10);
			break;
		case "game over":
			context.fillStyle = "rgba(255,255,255,1.0)";
			context.rect(0,0,WIDTH,HEIGHT);
			break;
	}

	context.fill();
	context.closePath();
	
}

$(document).ready(init);
