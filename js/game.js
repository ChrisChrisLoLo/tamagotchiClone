var game = new Phaser.Game(800,800,Phaser.AUTO);
var height = 800;
var width = 800;
var buttonDispX = 50;

pet = new pet();
date = new Date();
globalVal = new globalVal();


var tickCounter = 0 ;

var time;

function pet() {
	this.name = "BBQ MAN";
	this.sex = "M";
	this.age = 33;
	this.health = 50;
	this.happiness = 50;
	this.hunger = 50;
	this.mood = "Neutral";
	this.size = 60;
	this.poop = 0;
	//poop refers to legitimate fecal matter the pet makes. It is not immaturity on my side.
}

function globalVal(){
	this.money = 500;
	
}
//---------------------------STATES---------------------------------------
var main = {
	preload: function(){
		//loads an image can can be refenced as background
		this.load.image("background","assets/art/background.png");
		//loads a sprite sheet and breaks the sheet up into 10, 128 x 128 sprites.
		this.load.spritesheet("petSheet","assets/art/pet/petSheet.png",128,128,10);
		//loads button sprite sheet.
		this.load.spritesheet("buttonSheet","assets/art/buttonSheet.png",64,64,15);
		//loads a bitmapFont, which requires both a png as well as an XML file.
		this.load.bitmapFont("pixel","assets/font/pixelFont.png","assets/font/pixelFont.xml");
		
	},
	create: function(){
		//round pixels, so that pixel sprites remain sharp
		//this fixed a problem with the button sprite sheet
		game.renderer.renderSession.roundPixels = true;
		//Allows game to run in background
		game.stage.disableVisibilityChange = true;
		
		drawGameBody();
		
		//draw pet sprite
		petSprite = game.add.sprite(this.game.world.centerX,this.game.world.centerY,"petSheet");
		//change its "center point";
		petSprite.anchor.setTo(0.5,0.5);
		
		//adds a custom animation with name,frames wanted in sprite sheet, the fps, and if it wants to be looped.
		petSprite.animations.add("neutral",[0,1],2,true);
		petSprite.animations.add("sad",[2,3],2,true);
		petSprite.animations.add("dead",[4,5],2,true);
		petSprite.animations.add("happy",[6,7],2,true);
		petSprite.animations.add("angry",[8,9],2,true);

		counter = game.add.bitmapText(75, game.world.centerY-200,"pixel","tickCounter",32);
		
		petSprite.play("neutral");
	},
	
	update: function(){
		tickCheck();
		petSprite.play(pet.mood);
		

		counter.text = tickCounter;
		
	}
}

var stats = {
	preload: function(){	
	},
	create: function(){
		drawGameBody();
		var contents = "Name: " + pet.name + "\nAge:  "+ pet.age+"\nHealth:  "+pet.health + "\nHunger:  "+ pet.hunger+ "\nHappiness: "+pet.happiness;
		printText(contents);
	},
	update: function(){
		tickCheck();	
	}
}


var fastForward = {
	preload: function(){
	},
	create: function(){
		drawGameBody();
		tick();
		game.state.start("main");
	},
	update: function(){
	}
}



//---------------------------SUBSTATE FUNCTIONS---------------------------------------
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

//time per tick, in minutes
var TIME_PER_TICK = 1;
var timeBegin = 0;

//This function checks if the "real world clock" has advanced enough to increment the game a tick.
//The tick will alter the properties of the pet. 
function tickCheck(){
	var timeNow = (new Date()).getTime();
	//console.log("timeNow: "+timeNow);
	if (timeBegin == 0){
		timeBegin = (new Date()).getTime();
		//console.log("timeBegin: "+timeBegin);
	}
	if ((timeNow-timeBegin)>(TIME_PER_TICK*60*1000)){
		timeBegin = (new Date()).getTime();
		//console.log("timeBegin: "+timeBegin);
		tick();
	}
		 
}

function tick(){
	tickCounter++;
	console.log("tick");
	pet.hunger = pet.hunger-3;
	pet.happiness = pet.happiness-2;
	
	pet.happiness = Math.max(pet.happiness,0);
	pet.hunger = Math.max(pet.hunger,0);
	
	//now calculate pet mood
	if (pet.mood == "dead"){
		return;
	}
	
	if((pet.hunger>=70)&&(pet.happyness>=70)){
		pet.mood = "happy";
	}
	else if((pet.hunger>=30)&&(pet.happyness<30)){
		pet.mood = "angry";
	}
	else if(pet.hunger<=0){
		pet.mood = "dead";
	}
	else if((pet.hunger<30)||(pet.happyness<50)){
		pet.mood = "sad";
	}
	else{
		pet.mood = "neutral";
	}
	
	//see if the pet does it's business. goes more frequently if well fed.
	if(pet.hunger>90){
		if (Math.random()>0.70){
			pet.poop++;
		} 
	}
	else if(pet.hunger<=90){
		if (Math.random()>0.85){
			pet.poop++;
		}
	}
	console.log("dung: "+pet.poop);
	
}


game.state.add("main",main);
game.state.add("stats",stats);
game.state.add("fastForward",fastForward);
game.state.add("food",food);
game.state.start("main");