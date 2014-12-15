var context;
var score;
var gameState = "menu";

function init(){
	//get the canvas, and set the effective resolution.
	canvas = $("#demoCanvas")[0];
	context = canvas.getContext("2d");
	canvas.width = 640;
	canvas.height = 480;

	//when the player clicks on the canvas, set the game state to playing- if they were on the menu, reset their score.
	document.getElementById("demoCanvas").onclick = function(){
		if(gameState == "menu"){
			score = 0;
		}
		gameState = "playing";
	};

	//initialise all the game components
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
	//adds a rock to the rock list at a random x position, at the top of the screen, with a fixed radius and random speed (between 3 and 9)
	rocks.addRock(new Rock(Math.random()*canvas.width,0,15,6*Math.random()+3));
}

function initPlayer(){
	//makes a new player and positions them in the centre of the canvas.
	player = new Player(canvas.width/2 - 12.5, canvas.height/2 - 25, 25,50);
}

//set initial mouse positions so that the cursor stays within the canvas area
function initMouse(){
	minXPos = $('#demoCanvas').offset().left;
	maxXPos = minXPos + canvas.width;
	minYPos = $('#demoCanvas').offset().top;
	maxYPos = minYPos + canvas.height;
}

//make sure the mouse follows the player rectangle and moves the player. 
function onMouseMove(event){
	player.setX(event.pageX - minXPos - player.getWidth()/2);
	player.setY(event.pageY - minYPos - player.getHeight()/2);
}

function update(){

	//score increments every time update is ran, every 5 points the game adds another rock
	score++;
	if(score % 5 === 0){
		rocks.addRock(new Rock(Math.random()*canvas.width,0,15,6*Math.random()+4));
	}

	//update the position of all the rocks, check for collisions and the rock going off the edge of the screen
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

//check for rocks colliding with all sides of the player rectangle, return true if collision occurs.
function collision(rockX, rockY, rockR, playerX, playerY, playerW, playerH){
	collidedRectLeft = (rockX + rockR >= playerX) && (rockX + rockR <= playerX + playerW);
	collidedRectRight = (rockX - rockR >= playerX + playerW) && (rockX - rockR <= playerX);
	collidedRectTop = (rockY + rockR >= playerY) && (rockY + rockR <= playerY + playerH);
	collidedRectBottom = (rockY - rockR >= playerY + playerH) && (rockY - rockR <= playerY);

	if(collidedRectLeft && (collidedRectTop || collidedRectBottom) || collidedRectRight && (collidedRectTop || collidedRectBottom)){
		return true;
	}
}

function render(){
	//clear the screen before rendering
	context.clearRect(0,0,canvas.width, canvas.height);
	//if the game has just finished or hasn't started yet, display a black menu screen
	if(gameState == "menu"){
		context.beginPath();
		context.fillStyle = "#000";
		context.rect(0,0,canvas.width, canvas.height);
		context.fill();
		context.closePath();

		context.font = "30px sans-serif";
		context.fillStyle = "#fff";
		context.textAlign = "center";
		//if the game hasn't started yet, the score is undefined - display some instructions
		if(score === undefined){
			
			context.fillText("Click Here to Start",canvas.width/2, canvas.height/2);
			context.font = "20px sans-serif";
			context.fillText("Use the mouse to move - try to dodge the falling rocks.", canvas.width/2, canvas.height/2 + 20);
		}else{
			//otherwise the game has been played once and the player lost - display there score
			context.fillText("Score: " + score, canvas.width/2, canvas.height/2);
		}
		
	}else{
		//if the game state isn't menu, then the game should be playing - display there score in the top left, draw all the rocks, and update.
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