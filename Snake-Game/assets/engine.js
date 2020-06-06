// <div id="output"></div>
// <div id="display"></div>


// bind things together
function startEngine(){
	
// SIZE OF GAME
	SETTING__rows 	= 22;
	SETTING__cols 	= 40;
	GAME__START 	= 0;
	GAME__PAUSE     = 0;
	GAME_SPEED 		= 350;
	GAME_END 		= 0;
	GAME_SCORE 		= 0;

// For Enhanced Testing
	// SETTING__rows 	= 200;
	// SETTING__cols 	= 200;
	GAME_SPEED 		= 50;
	

// APPEARANCE
	COLOR__border 	= "#696969";
	COLOR__snake   	= "#FF6347";
	COLOR__target 	= "#FFDF00";
	COLOR__default 	= "black";

// CONTROL
	SNAKE_DIR 		= "UP";
	SNAKE_X			= 0;
	SNAKE_Y 		= 0;
	SNAKE_LENGTH 	= 0;
	SNAKE_PATH 		= [];
	SNAKE_TARGET 	= 0;
	SNAKE_TARGET_X  = 0;
	SNAKE_TARGET_Y 	= 0;
	SNAKE_TMP 		= [0,0];

// FUNCTIONS
	makeGrid();
	paintGrid();
	makeSnake();

// Game function
	setInterval(runGame, GAME_SPEED);
}


// main functions
function makeGrid(){
	var x = "<table >";
	for(var i=0; i<SETTING__rows; i++){
		x+= "<tr>";
		for(var j=0; j<SETTING__cols; j++){
			x+= "<td class='gameBox' id='__"+j+"-"+i+"'>";
			x+= "</td>";
		}
		x+= "</tr>";
	}
	x+= "</table>";
	$("#output").html(x);
	// console.log();
}

function paintGrid(){
	for(i=0; i<SETTING__rows; i++){
		for(j=0; j<SETTING__cols; j++){
			if(j==0 || j==SETTING__cols-1){
				$("#__"+j+"-"+i).css("background-color",COLOR__border);
			}

			if(i==0 || i==SETTING__rows-1){
				$("#__"+j+"-"+i).css("background-color",COLOR__border);				
			}
		}
	}
}

function makeSnake(){	
	// calculate the mid
	var midCol = parseInt(SETTING__cols)/2;
	var midRow = parseInt(SETTING__rows)/2;
	
	// Store Location
	SNAKE_X = midCol;
	SNAKE_Y = midRow;

	// paint the snake
	$("#__"+midCol+"-"+midRow).css("background-color",COLOR__snake);


	// Create Head of snake
	SNAKE_PATH.push([midCol, midRow]);
	SNAKE_LENGTH ++;
}

function startGame(){
	GAME__START = 1;
	console.log("start");
	console.log(GAME__START);
}

function pauseGame(){
	GAME__PAUSE = 1;
	console.log("pause");
	console.log(GAME__PAUSE);
}

function resumeGame(){
	GAME__PAUSE = 0;
	console.log("resume");
	console.log(GAME__PAUSE);
}

function endGame(){
	GAME_END = 1;
	console.log("GAME ENDED");
	alert("GAME ENDED ! Total Score :  " + GAME_SCORE);
}

function runPauseResume(){
	// GAME__START
	if(GAME__START == 0){
		// start game
		startGame();
	}
	else if(GAME__PAUSE == 0){
		pauseGame();
	}
	else if(GAME__PAUSE == 1){
		resumeGame();
	}
}


// Bindings
$("#output").on('click', function(){
	runPauseResume();
});

// Key Bindings
$(document).keydown(function(e){
	// space 
		if(e.keyCode == 32){
			runPauseResume();		
		}
	// left
		if(e.keyCode==37){
			SNAKE_DIR = "LEFT";
			console.log("LEFT");
		}
	// right
		if(e.keyCode==38){
			SNAKE_DIR = "UP";
			console.log("UP");
		}
	// up
		if(e.keyCode==39){
			SNAKE_DIR = "RIGHT";
			console.log("RIGHT");
		}
	// down
		if(e.keyCode==40){
			SNAKE_DIR = "DOWN";
			console.log("DOWN");
		}

	// Prefect Default action of keys
	e.preventDefault();
});


// FINAL GAME FUNCTIONS
function runGame(){
	if(GAME__START == 1 && GAME__PAUSE == 0 && GAME_END == 0){
		// move in direction
		direction = SNAKE_DIR;

		if(direction == "DOWN"){
			SNAKE_X = SNAKE_X;
			SNAKE_Y = SNAKE_Y+1;
			checkCollision();
			// showSnakeHead();
		}
		else if(direction == "UP"){
			SNAKE_X = SNAKE_X;
			SNAKE_Y = SNAKE_Y-1;
			checkCollision();
			// showSnakeHead();
		}
		else if(direction == "RIGHT"){
			SNAKE_X = SNAKE_X+1;
			SNAKE_Y = SNAKE_Y;
			checkCollision();
			// showSnakeHead();
		}
		else if(direction == "LEFT"){
			SNAKE_X = SNAKE_X-1;
			SNAKE_Y = SNAKE_Y;
			checkCollision();
			// showSnakeHead();
		}

		showSnakeHead();
		console.log(direction);
		console.log("New Head  = " + SNAKE_X + ", " + SNAKE_Y);
	}
}

function checkCollision(){
	if(SNAKE_X == 0 || SNAKE_X == SETTING__cols-1 ){
		alert("GAME OVER !");
		GAME_END = 1;
	}
	if(SNAKE_Y == 0 || SNAKE_Y == SETTING__rows-1 ){
		alert("GAME OVER !");
		GAME_END = 1;
	}

	// if get the target
	if(SNAKE_TARGET_X == SNAKE_X && SNAKE_TARGET_Y == SNAKE_Y){

		// disappear the target
		$("#__"+SNAKE_TARGET_X+"-"+SNAKE_TARGET_Y).css("background-color",COLOR__default);	

		// create new target
		SNAKE_TARGET = 0;

		// increment Score
		GAME_SCORE ++;

		// Increase Snake Length
		SNAKE_LENGTH ++;

		// Increase length of stored locations
		SNAKE_PATH.push([SNAKE_TARGET_X, SNAKE_TARGET_Y]);

		console.log("Score : " + GAME_SCORE);

		$("title").text("Score - " + GAME_SCORE);
		$("#clientMessage").text("Score - " + GAME_SCORE);
	}

	if(SNAKE_TARGET == 0){
		// Create target to eat
		createGoldenApple();
	}

	checkTargetVisibility();
	preventCollition();
}

function checkTargetVisibility(){
	// COlor code for golden Apple
	// rgb(255, 223, 0);
	if( $("#__"+SNAKE_TARGET_X+"-"+SNAKE_TARGET_Y).css("background-color") != "rgb(255, 223, 0);" ){
		$("#__"+SNAKE_TARGET_X+"-"+SNAKE_TARGET_Y).css("background-color", "COLOR__target");
	}
}

// most complicated function
function createGoldenApple(){
		SNAKE_TARGET_X = getRandomInclusive(2,SETTING__cols-2);
		SNAKE_TARGET_Y = getRandomInclusive(2,SETTING__rows-2);

		// paint target
		$("#__"+SNAKE_TARGET_X+"-"+SNAKE_TARGET_Y).css("background-color",COLOR__target);

		// mark that target now exist
		SNAKE_TARGET = 1;

		if(SNAKE_PATH.indexOf([SNAKE_TARGET_X, SNAKE_TARGET_Y]) != -1)
		{  
		   createGoldenApple();
		}
}

// shows movement of snake
function showSnakeHead(){

	// shift array by one
	for (var i = SNAKE_PATH.length-1 ; i >= 0; i--) {
		// disappear the tale
		$("#__"+SNAKE_PATH[SNAKE_PATH.length-1][0] +"-"+SNAKE_PATH[SNAKE_PATH.length-1][1]).css("background-color",COLOR__default);
		console.log("DSIAPPEARING TALE");

		// shift array by one
		SNAKE_PATH[i]	= SNAKE_PATH[i-1];

		// new head
		SNAKE_PATH[0] = [SNAKE_X,SNAKE_Y];
	}

	// show rest of snake
	for(var j=0; j < SNAKE_PATH.length; j++){
			// console.log(SNAKE_PATH[i][0],SNAKE_PATH[i][1]);
			console.log("DISPLAY !---------------------------------------------------");
			console.log(SNAKE_PATH[j]);
			$("#__"+SNAKE_PATH[j][0] +"-"+SNAKE_PATH[j][1]).css("background-color",COLOR__snake);		
			// console.log(SNAKE_PATH[i]);
	}

	// $("#__"+SNAKE_X+"-"+SNAKE_Y).css("background-color",COLOR__snake);
}

function getRandomInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function preventCollition(){
	// check if current head is in path
	if(SNAKE_PATH.indexOf([SNAKE_X, SNAKE_Y]) != -1){
		endGame();
	}
}