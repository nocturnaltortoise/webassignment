var context;

function init(){
	context = $('#demoCanvas')[0].getContext("2d");
	render();
}

function render(){
	context.fillStyle = "rgba(0,0,255, 0.5)";
	context.beginPath();
	context.arc(100,100,20,0,Math.PI*2, true);
	context.closePath();
	context.fill();
}

$(document).ready(init);
