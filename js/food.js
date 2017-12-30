function foodItem(name,spriteIndex,cost,desc,hungRestore){
	this.mainText = name;
	this.descText = desc;
	this.spriteIndex = spriteIndex;
	this.cost = cost;
	this.hungRestore = hungRestore;
	this.select = function() {
		pet.hunger = pet.hunger+this.hungRestore;
		globalVal.money = globalVal.money-this.cost;
		game.state.start("main");
	}
}

foodArray = [
	new foodItem("burger",1,10,"Fast food\nCosts $10",8),
	new foodItem("steak",1,20,"Cow flesh.\nCosts $20",18),
	new foodItem("creamsicle",1,5,"I hate creamsicles\nCosts $5",3),
	new foodItem("fish",1,20,"85% Mercury free!\nCosts $20",20),
	new foodItem("egg",1,20,"Egg flesh\nCosts $20",20),
	new foodItem("coffee",1,20,"Bitter drink\nCosts $20",20),
	new foodItem("drumstick",1,20,"Bird flesh\nCosts $20",20),
	new foodItem("shoe",1,100,"You pay for the design\nCosts $20",2),
	new foodItem("chicken",1,20,"Fresh chicken\nCosts $20",20)
];


slideCounter = 0;

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
	button12.variable = array;
	
	//draw food sprite
	sprite = game.add.sprite(this.game.world.centerX,this.game.world.centerY,spriteSheet);
	//change its "center point";
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

function displaySlide(spriteName,array,mainText,descText){
	//keep slide "pointer" within bounds.
	slideCounter = Math.min(Math.max(slideCounter, 0), array.length-1);
	spriteName.frame = slideCounter;
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

var food = {
	preload: function(){
		this.load.spritesheet("foodSheet","assets/art/items/foodSheet.png",128,128,9);
	},
	create: function(){
		drawGameBody();
		drawGameUI(foodArray,"foodSheet");
		
		/*
		//draw food sprite
		foodSprite = game.add.sprite(this.game.world.centerX,this.game.world.centerY,"foodSheet");
		//change its "center point";
		foodSprite.frame = 0;
		foodSprite.anchor.setTo(0.5);
		mainText = game.add.bitmapText(game.world.centerX, height*(1/4),"pixel","ERROR",32);
		mainText.anchor.setTo(0.5);
		foodText = game.add.bitmapText(game.world.centerX, height*(4/6),"pixel","ERROR",22);
		foodText.anchor.setTo(0.5);
		foodText.align = "center";
		*/
	},
	update: function(){
		displaySlide(sprite,foodArray,mainText,descText);
		tickCheck();	
	}
}