var canvas;
var context;
var WIDTH = 640;
var HEIGHT = 480;

function init(){
	canvas = $('#demoCanvas')[0]
	context = canvas.getContext("2d");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	render();
}

function render(){
	context.fillStyle = "rgba(204,204,204,1.0)"
	context.beginPath();
	context.rect(0,0,WIDTH,HEIGHT);
	context.closePath();
	context.fill();

	context.fillStyle = "rgba(140,250,240,1.0)";
	context.beginPath();
	context.rect(0,0,WIDTH, 50);
	context.rect(0,HEIGHT-10,WIDTH,10);
	context.closePath();
	context.fill();
}

$(document).ready(init);
