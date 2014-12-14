var context;
var score;
var gameState = "menu";
var counter = 0;

function init(){
	canvas = $("#demoCanvas")[0];
	context = canvas.getContext("2d");
	canvas.width = 640;
	canvas.height = 480;

	document.getElementById("demoCanvas").onclick = function(){
		
		if(gameState == "menu"){
			score = 0;
		}
		gameState = "playing";
		
		
	};
	initRocks();
	initPlayer();
	initMouse();
	canvas.addEventListener('mousemove', this.onMouseMove);
	$('#demoCanvas').mousemove(onMouseMove);
	interval = setInterval(render, 40);

}

function reset(){

	initRocks();
	initPlayer();
	initMouse();
}

function initRocks(){
	rocks = new RockList(0);
	for(i = 0; i < 10; i++){
		rocks.addRock(new Rock(Math.random()*canvas.width,0,15,6));
	}
	
}

function initPlayer(){
	player = new Player(canvas.width/2 - 12.5, canvas.height/2 - 25, 25,50,0,0);
}

function initMouse(){
	minXPos = $('#demoCanvas').offset().left;
	maxXPos = minXPos + canvas.width;
	minYPos = $('#demoCanvas').offset().top;
	maxYPos = minYPos + canvas.height;
}

function onMouseMove(event){
	player.setX(event.pageX - minXPos);
	player.setY(event.pageY - minYPos);
}

function update(){

	score++;
	if(score % 20 == 0){
		for(i = 0; i < 10; i++){
			rocks.addRock(new Rock(Math.random()*canvas.width,0,15,6));
			//rocks.getRock(i).setSpeed(rocks.getRock(i).getSpeed() + 2);
		}
	}

	for(i = 0; i < rocks.getSize(); i++){
		rock = rocks.getRock(i);

		rock.setY(rock.getY() + rock.getSpeed());

		if( collision(rock.getX(), rock.getY(), rock.getRadius(), player.getX(), player.getY(), player.getWidth(), player.getHeight()) ){
			gameState = "menu";
			reset();
		}
		if(rock.getY() >= canvas.height){
			rock = null;
		}
	}

}

function collision(rockX, rockY, rockR, playerX, playerY, playerW, playerH){
	
	if( (rockX + rockR >= playerX && rockX + rockR <= playerX + playerW && rockY + rockR >= playerY && rockY + rockR <= playerY + playerH)  
		|| (rockX - rockR >= playerX + playerW && rockX - rockR <= playerX && rockY - rockR >= playerY + playerH && rockY - rockR <= playerY) ){

		console.log("collision");
		return true;
	}
}

function render(){

	context.clearRect(0,0,canvas.width, canvas.height);
	if(gameState == "menu"){
		context.beginPath();
		context.fillStyle = "#000";
		context.rect(0,0,canvas.width, canvas.height);
		context.fill();
		context.closePath();

		context.font = "30px sans-serif";
		context.fillStyle = "#fff";
		context.textAlign = "center";
		if(score == undefined){
			
			context.fillText("Click Here to Start",canvas.width/2, canvas.height/2);
			context.font = "20px sans-serif";
			context.fillText("Use the mouse to move - try to dodge the falling rocks.", canvas.width/2, canvas.height/2 + 20);
		}else{
			
			context.fillText("Score: " + score, canvas.width/2, canvas.height/2);
		}
		
	}else{
		context.textAlign = "left";
		context.font = "20px sans-serif";
		context.fillText("Score: " + score, 15,30);
		player.draw(context);

		for(i = 0; i < rocks.getSize(); i++){
			rocks.getRock(i).draw(context);
		}
		update();
	}

}

$(document).ready(init);