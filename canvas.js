var context;

function init(){
	context = $("#demoCanvas")[0].getContext("2d");
	context.width = 640;
	context.height = 480;

	player = new Player(context.width/2, context.height/2, 50,100,3,4);
	rocks = new RockList(100);
	rocks.addRock(new Rock(0,0,10,5));
	console.log(rocks);

	interval = setInterval(render, 30);
}

function update(){

}

function render(){

	for(i = 0; i < rocks.getSize(); i++){
		rocks.getRock[i].draw(context);
	}

	update();
}

$(document).ready(init);