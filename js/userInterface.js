

/*
This file is a core building block in the program, as it is used to "scroll" through object arrays using
buttons, creating a UI for many states. The only thing that needs to be in put into these functions
are arrays and their corresponding spriteSheets. 
Objects put into these functions should have a format like this:
function foodItem(name,spriteIndex,cost,desc,hungRestore){
	this.mainText = name;
	this.descText = desc;
	this.spriteIndex = spriteIndex;
	this.cost = cost;
	this.hungRestore = hungRestore;
	this.select = function() {
		//PUT METHOD HERE
	}
}
Object must have mainText,descText,spriteIndex properties and should have a select() method.
*/


slideCounter = 0;
//this function creates the buttons and UI to be displayed to the user.
function drawGameUI(array,spriteSheet){
	slideCounter= 0;
	button10 = game.add.button(width*(1/6) ,this.game.world.centerY,"buttonSheet",changeSlide,this,11,11,11);
	button10.name = "backward";
	button10.anchor.set(0.5); 
	
	button11 = game.add.button(width*(5/6), this.game.world.centerY,"buttonSheet",changeSlide,this,10,10,10);
	button11.name = "forward";
	button11.anchor.set(0.5);
	
	button12 = game.add.button(this.game.world.centerX,height*(7/9),"buttonSheet",changeSlide,[this,array],12,12,12);
	button12.name = "select";
	button12.anchor.set(0.5);
	//notice how you can assign variables to buttons, very useful for parsing in parameters.
	button12.variable = array;
	
	sprite = game.add.sprite(this.game.world.centerX,this.game.world.centerY,spriteSheet);
	sprite.frame = 0;
	sprite.anchor.setTo(0.5);
	mainText = game.add.bitmapText(game.world.centerX, height*(1/4),"pixel","ERROR",32);
	mainText.anchor.setTo(0.5);
	descText = game.add.bitmapText(game.world.centerX, height*(4/6),"pixel","ERROR",22);
	descText.anchor.setTo(0.5);
	descText.align = "center";
	
}

//changeSlide() is used to pass through various arrays
//an array must be defined in each state in order to be parsed by this function.
function changeSlide(button){
	console.log(button.variable);
	switch(button.name){
		case "backward":
			slideCounter--;
			break;
		case "forward":
			slideCounter++;
			break;
		case "select":
			button.variable[slideCounter].select();
			break;
	}
}

//To be used in the update loop; displays "slides" of an object in a list.
//changes properties of created game objects in drawGameUI according to the
//objects properties.
function displaySlide(array){
	//keep slide "pointer" within bounds.
	slideCounter = Math.min(Math.max(slideCounter, 0), array.length-1);
	sprite.frame = array[slideCounter].spriteIndex;
	//console.log(array[slideCounter].mainText);
	//console.log(slideCounter);
	//console.log(array[slideCounter].descText);
	if (slideCounter == 0){
		button10.alpha = 0;
	}
	else if (slideCounter == (array.length-1)){
		button11.alpha = 0;
	}
	else{
		button10.alpha = 1;
		button11.alpha = 1;
	}
	mainText.text = array[slideCounter].mainText;
	descText.text = array[slideCounter].descText;
	
}
//-----------------------------------------------------------------------------------------------
function printText(contents){
	var text = game.add.bitmapText(75, game.world.centerY-200,"pixel",contents,32);
	//text.anchor.set(0.5);
		//
}


function drawGameBody(){
	//game.stage.backgroundColor = "#ff6e2b";
	this.background = this.game.add.sprite(0,0,"background");
	
	//add buttons
	//"buttonSheet" is the name of the resource you are loading, changeState is the
	//function you want to execute on click, and the last thee numbers correspond to the 
	//frames you want in your buttonSheet in order of "out,over,clicked"
	button0 = game.add.button(width*(1/6) ,buttonDispX,"buttonSheet",changeState,this,0,0,0);
	button0.name = "stats";
	button0.anchor.set(0.5);
	
	button1 = game.add.button(width*(2/6) ,buttonDispX,"buttonSheet",changeState,this,2,2,2);
	button1.name = "food";
	button1.anchor.set(0.5);
		
	button2 = game.add.button(width*(3/6) ,buttonDispX,"buttonSheet",changeState,this,1,1,1);
	button2.name = "toilet";
	button2.anchor.set(0.5);
		
	button3 = game.add.button(width*(4/6) ,buttonDispX,"buttonSheet",changeState,this,3,3,3);
	button3.name = "games";
	button3.anchor.set(0.5);
		
	button4 = game.add.button(width*(5/6) ,buttonDispX,"buttonSheet",changeState,this,4,4,4);
	button4.name = "fastForward";
	button4.anchor.set(0.5);
		
	button5 = game.add.button(width*(1/6) ,height-buttonDispX,"buttonSheet",changeState,this,5,5,5);
	button5.name = "discipline";
	button5.anchor.set(0.5);
	
	button6 = game.add.button(width*(2/6) ,height-buttonDispX,"buttonSheet",changeState,this,6,6,6);
	button6.name = "medicine";
	button6.anchor.set(0.5);

	button7 = game.add.button(width*(3/6) ,height-buttonDispX,"buttonSheet",changeState,this,7,7,7);
	button7.name = "shop";
	button7.anchor.set(0.5);	
	
	button8 = game.add.button(width*(4/6) ,height-buttonDispX,"buttonSheet",changeState,this,8,8,8);
	button8.name = "attention";
	button8.anchor.set(0.5);	
	
	button9 = game.add.button(width*(5/6) ,height-buttonDispX,"buttonSheet",changeState,this,9,9,9);
	button9.name = "main";
	button9.anchor.set(0.5);	
}

function changeState(button){
		console.log(button.name);
		game.state.start(button.name);
}


